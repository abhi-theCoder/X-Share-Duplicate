const { supabase } = require("../services/supabase");
const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Import your new React template components
const Template1 = require('../templates/Template1');
const Template2 = require('../templates/Template2');
const Template3 = require('../templates/Template3');

// ---------------- UPLOAD IMAGE ----------------
async function uploadImage(file) {
  if (!file) return null;

  try {
    const fileName = `${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("user_bucket")
      .upload(`resume-images/${fileName}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from("user_bucket")
      .getPublicUrl(`resume-images/${fileName}`);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}

// ---------------- CREATE RESUME ----------------
exports.createResume = async (req, res) => {
  try {
    const file = req.file;
    let photoUrl = null;

    // Upload image if provided
    if (file) {
      console.log("📸 Uploading profile picture:", file.originalname);
      photoUrl = await uploadImage(file);
    }

    const {
      name, email, title, summary, template,
      education, experience, skills, projects,
      languages, links, description, address
    } = req.body;

    console.log("📝 Processing resume data for:", name);

    // Parse JSON fields safely
    const parseField = (field, fieldName) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      try {
        const parsed = JSON.parse(field);
        console.log(`✅ ${fieldName} parsed:`, Array.isArray(parsed) ? `${parsed.length} items` : "valid");
        return parsed;
      } catch (e) {
        console.warn(`❌ Failed to parse ${fieldName}:`, e.message);
        return [];
      }
    };

    const parseLinks = (linksField) => {
      if (!linksField) return {};
      if (typeof linksField === 'object') return linksField;
      try {
        return JSON.parse(linksField);
      } catch (e) {
        console.warn(`Failed to parse links:`, e);
        return {};
      }
    };

    const resumeData = {
      name: name?.trim() || '',
      email: email?.trim() || '',
      title: title?.trim() || '',
      summary: summary?.trim() || '',
      template: template ? parseInt(template) : 1,
      photo_url: photoUrl,
      education: parseField(education, "education"),
      experience: parseField(experience, "experience"),
      skills: parseField(skills, "skills"),
      projects: parseField(projects, "projects"),
      languages: parseField(languages, "languages"),
      links: parseLinks(links),
      description: description?.trim() || '',
      address: address?.trim() || '',
    };

    console.log("✅ Resume data prepared for database");

    // Validate required fields
    if (!resumeData.name || !resumeData.email || !resumeData.title || !resumeData.summary) {
      return res.status(400).json({ 
        message: "Missing required fields: name, email, title, summary" 
      });
    }

    const { data, error } = await supabase
      .from("resumes12")
      .insert([resumeData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    console.log("✅ Resume saved with ID:", data.id);

    res.status(201).json({
      message: "Resume created successfully",
      id: data.id,
      data: data
    });
  } catch (err) {
    console.error("Create resume error:", err);
    res.status(500).json({ 
      message: "Failed to create resume", 
      error: err.message 
    });
  }
};

// ---------------- UPDATE RESUME ----------------
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    console.log("🔄 Updating resume:", id);

    if (!id) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    let photoUrl;
    if (file) {
      console.log("📸 Uploading new profile picture");
      photoUrl = await uploadImage(file);
    }

    const {
      name, email, title, summary, template,
      education, experience, skills, projects,
      languages, links, description, address
    } = req.body;

    // Parse JSON fields safely
    const parseField = (field) => {
      if (!field) return undefined;
      if (Array.isArray(field)) return field;
      try {
        return JSON.parse(field);
      } catch (e) {
        console.warn(`Failed to parse field:`, e);
        return undefined;
      }
    };

    const parseLinks = (linksField) => {
      if (!linksField) return undefined;
      if (typeof linksField === 'object') return linksField;
      try {
        return JSON.parse(linksField);
      } catch (e) {
        console.warn(`Failed to parse links:`, e);
        return undefined;
      }
    };

    const updateData = {
      name: name?.trim(),
      email: email?.trim(),
      title: title?.trim(),
      summary: summary?.trim(),
      template: template ? parseInt(template) : undefined,
      education: parseField(education),
      experience: parseField(experience),
      skills: parseField(skills),
      projects: parseField(projects),
      languages: parseField(languages),
      links: parseLinks(links),
      description: description?.trim(),
      address: address?.trim(),
      updated_at: new Date().toISOString()
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    // Add photo URL if new image was uploaded
    if (photoUrl) {
      updateData.photo_url = photoUrl;
    }

    console.log("📝 Update data prepared");

    const { data, error } = await supabase
      .from("resumes12")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: "Resume not found" });
    }

    console.log("✅ Resume updated successfully");

    res.json({
      message: "Resume updated successfully",
      data: data
    });
  } catch (err) {
    console.error("Update resume error:", err);
    res.status(500).json({ 
      message: "Failed to update resume", 
      error: err.message 
    });
  }
};

// ---------------- GET ALL RESUMES ----------------
exports.getResumes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("resumes12")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      message: "Resumes fetched successfully",
      data: data || []
    });
  } catch (err) {
    console.error("Get resumes error:", err);
    res.status(500).json({ 
      message: "Failed to fetch resumes", 
      error: err.message 
    });
  }
};

// ---------------- GET RESUME BY ID ----------------
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    const { data, error } = await supabase
      .from("resumes12")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase fetch error:", error);
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({
      message: "Resume fetched successfully",
      data: data
    });
  } catch (err) {
    console.error("Get resume by ID error:", err);
    res.status(500).json({ 
      message: "Failed to fetch resume", 
      error: err.message 
    });
  }
};

// ---------------- DELETE RESUME ----------------
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    // First, get the resume to check if it exists and get photo URL
    const { data: resume, error: fetchError } = await supabase
      .from("resumes12")
      .select("photo_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Fetch resume error:", fetchError);
      throw fetchError;
    }

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Delete the resume record
    const { error } = await supabase
      .from("resumes12")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }

    // Optional: Delete the associated image from storage
    if (resume.photo_url) {
      try {
        const fileName = resume.photo_url.split('/').pop();
        await supabase.storage
          .from("user_bucket")
          .remove([`resume-images/${fileName}`]);
      } catch (storageError) {
        console.warn("Failed to delete image from storage:", storageError);
        // Don't fail the request if image deletion fails
      }
    }

    res.json({ 
      message: "Resume deleted successfully" 
    });
  } catch (err) {
    console.error("Delete resume error:", err);
    res.status(500).json({ 
      message: "Failed to delete resume", 
      error: err.message 
    });
  }
};

// ---------------- GENERATE PDF (USING REACT COMPONENTS) ----------------
exports.generateResumePDF = async (req, res) => {
  let browser = null;
  
  try {
    const { id } = req.params;
    console.log("🚀 Starting PDF generation for ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    // 1. Fetch resume data
    console.log("📋 Fetching resume from database...");
    const { data: resume, error } = await supabase
      .from("resumes12")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    console.log("✅ Resume found:", resume.name);

    // 2. Choose the right React template component
    const templateNumber = resume.template || 1;
    let TemplateComponent;
    
    switch(templateNumber) {
      case 1:
        TemplateComponent = Template1;
        break;
      case 2:
        TemplateComponent = Template2;
        break;
      case 3:
        TemplateComponent = Template3;
        break;
      default:
        TemplateComponent = Template1;
    }

    console.log(`🎨 Using Template ${templateNumber}`);

    // 3. Prepare formData for the component
    const formData = {
      name: resume.name || '',
      email: resume.email || '',
      title: resume.title || '',
      summary: resume.summary || '',
      description: resume.description || '',
      address: resume.address || '',
      profilePreview: resume.photo_url || '',
      skills: Array.isArray(resume.skills) ? resume.skills : [],
      education: Array.isArray(resume.education) ? resume.education : [],
      experience: Array.isArray(resume.experience) ? resume.experience : [],
      projects: Array.isArray(resume.projects) ? resume.projects : [],
      languages: Array.isArray(resume.languages) ? resume.languages : [],
      links: resume.links || {}
    };

    // 4. Render React component to HTML
    console.log("🎨 Rendering React component...");
    const reactElement = React.createElement(TemplateComponent, { formData });
    const htmlContent = ReactDOMServer.renderToStaticMarkup(reactElement);

    // Wrap in proper HTML document
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            * { 
              box-sizing: border-box; 
            }
            img { 
              max-width: 100%; 
              height: auto; 
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // 5. Generate PDF with Puppeteer
    console.log("🌐 Launching browser...");
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    console.log("📝 Setting content...");
    await page.setContent(fullHtml, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for images to load
    console.log("🖼️ Waiting for images to load...");
    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('img'));
      await Promise.all(selectors.map(img => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      }));
    });

    // Wait for rendering
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate PDF
    console.log("🖨️ Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    console.log("✅ PDF Generated:", pdfBuffer.length, "bytes");

    if (pdfBuffer.length === 0) {
      throw new Error("Empty PDF generated");
    }

    // Send response
    const safeFileName = (resume.name || 'resume').replace(/[^a-zA-Z0-9]/g, '_');
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeFileName}_Resume.pdf"`,
      'Content-Length': pdfBuffer.length
    });

    console.log("📤 Sending PDF to client...");
    res.send(pdfBuffer);
    console.log("🎉 PDF successfully delivered!");

  } catch (error) {
    console.error("❌ PDF Generation Failed:", error);
    res.status(500).json({
      message: "Failed to generate PDF",
      error: error.message
    });
  } finally {
    if (browser) {
      await browser.close();
      console.log("🔒 Browser closed");
    }
  }
};

// ---------------- HEALTH CHECK ----------------
exports.healthCheck = async (req, res) => {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('resumes12')
      .select('count')
      .limit(1);

    if (error) throw error;

    res.json({ 
      status: 'OK', 
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'Error', 
      database: 'Disconnected',
      error: err.message 
    });
  }
};

// ---------------- PDF HEALTH CHECK ----------------
exports.pdfHealthCheck = async (req, res) => {
  let browser = null;
  try {
    console.log("🔍 Testing PDF generation health...");
    
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent('<h1>Test PDF</h1><p>PDF generation is working!</p>');
    
    const testPdf = await page.pdf({ format: 'A4' });
    
    await browser.close();
    
    res.json({
      status: 'OK',
      pdfGeneration: 'Working',
      pdfSize: testPdf.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("PDF health check failed:", error);
    
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }
    
    res.status(500).json({
      status: 'ERROR',
      pdfGeneration: 'Failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
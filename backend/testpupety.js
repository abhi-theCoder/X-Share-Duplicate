const puppeteer = require('puppeteer');

async function testPuppeteer() {
  let browser;
  try {
    console.log('🚀 Testing Puppeteer...');
    
    // Try different launch options
    const launchOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    
    console.log('📋 Launch options:', launchOptions);
    browser = await puppeteer.launch(launchOptions);
    
    console.log('✅ Browser launched successfully!');
    
    const page = await browser.newPage();
    await page.setContent('<h1>Test PDF</h1><p>Puppeteer is working!</p>');
    
    const pdfBuffer = await page.pdf({ format: 'A4' });
    console.log(`✅ PDF generated: ${pdfBuffer.length} bytes`);
    
    // Save test PDF to check
    const fs = require('fs');
    fs.writeFileSync('test-output.pdf', pdfBuffer);
    console.log('✅ Test PDF saved as test-output.pdf');
    
  } catch (error) {
    console.error('❌ Puppeteer test failed:', error.message);
    console.error('Error details:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed');
    }
  }
}

testPuppeteer();
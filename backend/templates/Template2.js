const React = require('react');

const Template2 = ({ formData }) => {
  return React.createElement('div', {
    style: {
      width: '210mm',
      minHeight: '297mm',
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: {
        background: 'linear-gradient(to right, #2563eb, #7c3aed)',
        color: 'white',
        padding: '32px'
      }
    }, [
      React.createElement('div', {
        key: 'header-content',
        style: { display: 'flex', alignItems: 'center', gap: '24px' }
      }, [
        formData.profilePreview && React.createElement('img', {
          key: 'profile-img',
          src: formData.profilePreview,
          alt: "Profile",
          style: {
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            objectFit: 'cover'
          }
        }),
        React.createElement('div', { key: 'header-text' }, [
          React.createElement('h1', {
            key: 'name',
            style: {
              fontSize: '30px',
              fontWeight: 'bold',
              marginBottom: '8px',
              margin: 0
            }
          }, formData.name),
          React.createElement('h2', {
            key: 'title',
            style: {
              fontSize: '20px',
              opacity: 0.9,
              margin: 0
            }
          }, formData.title)
        ])
      ])
    ]),

    // Main Content
    React.createElement('div', {
      key: 'main-content',
      style: {
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px'
      }
    }, [
      // Left Column
      React.createElement('div', {
        key: 'left-column',
        style: { display: 'flex', flexDirection: 'column', gap: '24px' }
      }, [
        // Summary
        React.createElement('div', { key: 'summary' }, [
          React.createElement('h3', {
            key: 'summary-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Professional Summary'),
          React.createElement('div', {
            key: 'summary-box',
            style: {
              backgroundColor: '#dbeafe',
              padding: '16px',
              borderRadius: '8px',
              borderLeft: '4px solid #2563eb'
            }
          }, [
            React.createElement('p', {
              key: 'summary-text',
              style: {
                color: '#374151',
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0
              }
            }, formData.summary)
          ])
        ]),

        // Experience
        formData.experience.length > 0 && React.createElement('div', { key: 'experience' }, [
          React.createElement('h3', {
            key: 'experience-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Work Experience'),
          React.createElement('div', {
            key: 'experience-list',
            style: { display: 'flex', flexDirection: 'column', gap: '16px' }
          }, formData.experience.map((exp, index) =>
            React.createElement('div', {
              key: `exp-${index}`,
              style: { position: 'relative', paddingLeft: '20px' }
            }, [
              React.createElement('div', {
                key: 'bullet',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: '8px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%'
                }
              }),
              React.createElement('div', {
                key: 'role',
                style: {
                  fontWeight: 600,
                  color: '#1f2937',
                  fontSize: '14px',
                  margin: 0
                }
              }, exp.role),
              React.createElement('div', {
                key: 'company-duration',
                style: {
                  color: '#6b7280',
                  fontSize: '12px',
                  marginBottom: '4px',
                  margin: 0
                }
              }, `${exp.company} | ${exp.duration}`),
              exp.description && React.createElement('div', {
                key: 'description',
                style: {
                  color: '#374151',
                  fontSize: '14px',
                  margin: 0
                }
              }, exp.description)
            ])
          ))
        ]),

        // Projects
        formData.projects.length > 0 && React.createElement('div', { key: 'projects' }, [
          React.createElement('h3', {
            key: 'projects-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Key Projects'),
          React.createElement('div', {
            key: 'projects-list',
            style: { display: 'flex', flexDirection: 'column', gap: '16px' }
          }, formData.projects.map((project, index) =>
            React.createElement('div', {
              key: `project-${index}`,
              style: { position: 'relative', paddingLeft: '20px' }
            }, [
              React.createElement('div', {
                key: 'bullet',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: '8px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%'
                }
              }),
              React.createElement('div', {
                key: 'name',
                style: {
                  fontWeight: 600,
                  color: '#1f2937',
                  fontSize: '14px',
                  margin: 0
                }
              }, project.name),
              project.link && React.createElement('div', {
                key: 'link',
                style: {
                  color: '#6b7280',
                  fontSize: '12px',
                  margin: 0
                }
              }, project.link),
              React.createElement('div', {
                key: 'description',
                style: {
                  color: '#374151',
                  fontSize: '14px',
                  marginTop: '4px',
                  margin: 0
                }
              }, project.description)
            ])
          ))
        ])
      ]),

      // Right Column
      React.createElement('div', {
        key: 'right-column',
        style: { display: 'flex', flexDirection: 'column', gap: '24px' }
      }, [
        // Contact
        React.createElement('div', { key: 'contact' }, [
          React.createElement('h3', {
            key: 'contact-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Contact'),
          React.createElement('div', {
            key: 'contact-info',
            style: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }
          }, [
            React.createElement('div', {
              key: 'email',
              style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
              React.createElement('span', { key: 'email-icon' }, '📧'),
              React.createElement('span', { key: 'email-text' }, formData.email)
            ]),
            formData.address && React.createElement('div', {
              key: 'address',
              style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
              React.createElement('span', { key: 'address-icon' }, '🗺️'),
              React.createElement('span', { key: 'address-text' }, formData.address)
            ]),
            formData.links?.linkedin && React.createElement('div', {
              key: 'linkedin',
              style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
              React.createElement('span', { key: 'linkedin-icon' }, '🔗'),
              React.createElement('span', {
                key: 'linkedin-text',
                style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
              }, formData.links.linkedin)
            ]),
            formData.links?.github && React.createElement('div', {
              key: 'github',
              style: { display: 'flex', alignItems: 'center', gap: '8px' }
            }, [
              React.createElement('span', { key: 'github-icon' }, '🔗'),
              React.createElement('span', {
                key: 'github-text',
                style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
              }, formData.links.github)
            ])
          ])
        ]),

        // Skills
        formData.skills.length > 0 && React.createElement('div', { key: 'skills' }, [
          React.createElement('h3', {
            key: 'skills-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Skills & Expertise'),
          React.createElement('div', {
            key: 'skills-list',
            style: { display: 'flex', flexWrap: 'wrap', gap: '8px' }
          }, formData.skills.map((skill, index) =>
            React.createElement('span', {
              key: `skill-${index}`,
              style: {
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '14px'
              }
            }, skill)
          ))
        ]),

        // Education
        formData.education.length > 0 && React.createElement('div', { key: 'education' }, [
          React.createElement('h3', {
            key: 'education-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Education'),
          React.createElement('div', {
            key: 'education-list',
            style: { display: 'flex', flexDirection: 'column', gap: '16px' }
          }, formData.education.map((edu, index) =>
            React.createElement('div', {
              key: `edu-${index}`,
              style: { position: 'relative', paddingLeft: '20px' }
            }, [
              React.createElement('div', {
                key: 'bullet',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: '8px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%'
                }
              }),
              React.createElement('div', {
                key: 'degree',
                style: {
                  fontWeight: 600,
                  color: '#1f2937',
                  fontSize: '14px',
                  margin: 0
                }
              }, edu.degree),
              React.createElement('div', {
                key: 'college-year',
                style: {
                  color: '#6b7280',
                  fontSize: '12px',
                  margin: 0
                }
              }, `${edu.college} • ${edu.year}`),
              edu.marks && React.createElement('div', {
                key: 'marks',
                style: {
                  color: '#6b7280',
                  fontSize: '12px',
                  margin: 0
                }
              }, `Marks: ${edu.marks}`)
            ])
          ))
        ]),

        // Languages
        formData.languages.length > 0 && React.createElement('div', { key: 'languages' }, [
          React.createElement('h3', {
            key: 'languages-title',
            style: {
              color: '#2563eb',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }
          }, 'Languages'),
          React.createElement('div', {
            key: 'languages-list',
            style: { display: 'flex', flexWrap: 'wrap', gap: '8px' }
          }, formData.languages.map((language, index) =>
            React.createElement('span', {
              key: `language-${index}`,
              style: {
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '14px'
              }
            }, language)
          ))
        ])
      ])
    ])
  ]);
};

module.exports = Template2;
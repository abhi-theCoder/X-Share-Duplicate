const React = require('react');

const Template1 = ({ formData }) => {
  return React.createElement('div', {
    style: {
      width: '210mm',
      minHeight: '297mm',
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    // Sidebar
    React.createElement('div', {
      key: 'sidebar',
      style: {
        width: '40%',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '24px'
      }
    }, [
      // Profile Image
      formData.profilePreview && React.createElement('img', {
        key: 'profile-img',
        src: formData.profilePreview,
        alt: "Profile",
        style: {
          width: '128px',
          height: '128px',
          borderRadius: '50%',
          margin: '0 auto 16px auto',
          border: '4px solid #3b82f6',
          objectFit: 'cover'
        }
      }),
      
      // Contact Info
      React.createElement('div', {
        key: 'contact',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h3', {
          key: 'contact-title',
          style: {
            color: '#60a5fa',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }
        }, 'Contact'),
        React.createElement('div', {
          key: 'contact-info',
          style: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }
        }, [
          React.createElement('div', {
            key: 'email',
            style: { display: 'flex', alignItems: 'center' }
          }, [
            React.createElement('span', { key: 'email-icon', style: { marginRight: '8px' } }, '📧'),
            React.createElement('span', { key: 'email-text' }, formData.email)
          ]),
          formData.address && React.createElement('div', {
            key: 'address',
            style: { display: 'flex', alignItems: 'center' }
          }, [
            React.createElement('span', { key: 'address-icon', style: { marginRight: '8px' } }, '🗺️'),
            React.createElement('span', { key: 'address-text' }, formData.address)
          ]),
          formData.links?.linkedin && React.createElement('div', {
            key: 'linkedin',
            style: { display: 'flex', alignItems: 'center' }
          }, [
            React.createElement('span', { key: 'linkedin-icon', style: { marginRight: '8px' } }, '🔗'),
            React.createElement('span', {
              key: 'linkedin-text',
              style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
            }, formData.links.linkedin)
          ]),
          formData.links?.github && React.createElement('div', {
            key: 'github',
            style: { display: 'flex', alignItems: 'center' }
          }, [
            React.createElement('span', { key: 'github-icon', style: { marginRight: '8px' } }, '🔗'),
            React.createElement('span', {
              key: 'github-text',
              style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
            }, formData.links.github)
          ])
        ])
      ]),

      // Skills
      formData.skills.length > 0 && React.createElement('div', {
        key: 'skills',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h3', {
          key: 'skills-title',
          style: {
            color: '#60a5fa',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }
        }, 'Skills'),
        React.createElement('div', {
          key: 'skills-list',
          style: { display: 'flex', flexDirection: 'column', gap: '8px' }
        }, formData.skills.map((skill, index) =>
          React.createElement('div', {
            key: `skill-${index}`,
            style: { fontSize: '14px' }
          }, skill)
        ))
      ]),

      // Languages
      formData.languages.length > 0 && React.createElement('div', {
        key: 'languages',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h3', {
          key: 'languages-title',
          style: {
            color: '#60a5fa',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }
        }, 'Languages'),
        React.createElement('div', {
          key: 'languages-list',
          style: { display: 'flex', flexDirection: 'column', gap: '8px' }
        }, formData.languages.map((language, index) =>
          React.createElement('div', {
            key: `language-${index}`,
            style: { fontSize: '14px' }
          }, language)
        ))
      ])
    ]),

    // Main Content
    React.createElement('div', {
      key: 'main-content',
      style: {
        width: '60%',
        padding: '24px'
      }
    }, [
      // Name and Title
      React.createElement('div', {
        key: 'name-title',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h1', {
          key: 'name',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px',
            margin: 0
          }
        }, formData.name),
        React.createElement('h2', {
          key: 'title',
          style: {
            fontSize: '20px',
            color: '#2563eb',
            fontWeight: 300,
            margin: 0
          }
        }, formData.title)
      ]),

      // Summary
      React.createElement('div', {
        key: 'summary',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('div', {
          key: 'summary-box',
          style: {
            backgroundColor: '#f9fafb',
            padding: '16px',
            borderRadius: '8px'
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
      formData.experience.length > 0 && React.createElement('div', {
        key: 'experience',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h3', {
          key: 'experience-title',
          style: {
            fontSize: '18px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #d1d5db',
            paddingBottom: '4px'
          }
        }, 'Experience'),
        React.createElement('div', {
          key: 'experience-list',
          style: { display: 'flex', flexDirection: 'column', gap: '16px' }
        }, formData.experience.map((exp, index) =>
          React.createElement('div', {
            key: `exp-${index}`,
            style: { fontSize: '14px' }
          }, [
            React.createElement('div', {
              key: 'role',
              style: {
                fontWeight: 600,
                color: '#1f2937',
                margin: 0
              }
            }, `${exp.role} - ${exp.company}`),
            React.createElement('div', {
              key: 'duration',
              style: {
                color: '#6b7280',
                marginBottom: '4px',
                margin: 0
              }
            }, exp.duration),
            exp.description && React.createElement('div', {
              key: 'description',
              style: {
                color: '#374151',
                margin: 0
              }
            }, exp.description)
          ])
        ))
      ]),

      // Education
      formData.education.length > 0 && React.createElement('div', {
        key: 'education',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h3', {
          key: 'education-title',
          style: {
            fontSize: '18px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #d1d5db',
            paddingBottom: '4px'
          }
        }, 'Education'),
        React.createElement('div', {
          key: 'education-list',
          style: { display: 'flex', flexDirection: 'column', gap: '16px' }
        }, formData.education.map((edu, index) =>
          React.createElement('div', {
            key: `edu-${index}`,
            style: { fontSize: '14px' }
          }, [
            React.createElement('div', {
              key: 'degree',
              style: {
                fontWeight: 600,
                color: '#1f2937',
                margin: 0
              }
            }, edu.degree),
            React.createElement('div', {
              key: 'college',
              style: {
                color: '#6b7280',
                margin: 0
              }
            }, `${edu.college} • ${edu.year}`),
            edu.marks && React.createElement('div', {
              key: 'marks',
              style: {
                color: '#6b7280',
                margin: 0
              }
            }, `Marks: ${edu.marks}`)
          ])
        ))
      ]),

      // Projects
      formData.projects.length > 0 && React.createElement('div', {
        key: 'projects',
        style: { marginBottom: '24px' }
      }, [
        React.createElement('h3', {
          key: 'projects-title',
          style: {
            fontSize: '18px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #d1d5db',
            paddingBottom: '4px'
          }
        }, 'Projects'),
        React.createElement('div', {
          key: 'projects-list',
          style: { display: 'flex', flexDirection: 'column', gap: '16px' }
        }, formData.projects.map((project, index) =>
          React.createElement('div', {
            key: `project-${index}`,
            style: {
              fontSize: '14px',
              borderLeft: '4px solid #3b82f6',
              paddingLeft: '12px'
            }
          }, [
            React.createElement('div', {
              key: 'project-name',
              style: {
                fontWeight: 600,
                color: '#1f2937',
                margin: 0
              }
            }, project.name),
            project.link && React.createElement('div', {
              key: 'project-link',
              style: {
                color: '#6b7280',
                margin: 0
              }
            }, `Link: ${project.link}`),
            React.createElement('div', {
              key: 'project-description',
              style: {
                color: '#374151',
                marginTop: '4px',
                margin: 0
              }
            }, project.description)
          ])
        ))
      ])
    ])
  ]);
};

module.exports = Template1;
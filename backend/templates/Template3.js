const React = require('react');

const Template3 = ({ formData }) => {
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
        padding: '24px',
        color: 'white',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        position: 'relative',
        overflow: 'hidden'
      }
    }, [
      // Decorative circle
      React.createElement('div', {
        key: 'decorative-circle',
        style: {
          position: 'absolute',
          top: '-32px',
          right: '-32px',
          width: '64px',
          height: '64px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }
      }),
      
      // Profile
      React.createElement('div', {
        key: 'profile',
        style: { position: 'relative', zIndex: 10 }
      }, [
        formData.profilePreview && React.createElement('img', {
          key: 'profile-img',
          src: formData.profilePreview,
          alt: "Profile",
          style: {
            width: '144px',
            height: '144px',
            borderRadius: '50%',
            margin: '0 auto 16px auto',
            border: '4px solid white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover'
          }
        }),
        React.createElement('h1', {
          key: 'name',
          style: {
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4px',
            margin: 0
          }
        }, formData.name),
        React.createElement('h2', {
          key: 'title',
          style: {
            textAlign: 'center',
            opacity: 0.9,
            fontSize: '14px',
            margin: 0
          }
        }, formData.title)
      ]),

      // Contact
      React.createElement('div', {
        key: 'contact',
        style: { marginTop: '32px', position: 'relative', zIndex: 10 }
      }, [
        React.createElement('h3', {
          key: 'contact-title',
          style: {
            fontWeight: 600,
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: '4px'
          }
        }, 'Contact'),
        React.createElement('div', {
          key: 'contact-info',
          style: { display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }
        }, [
          React.createElement('div', {
            key: 'email',
            style: {
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '8px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }
          }, [
            React.createElement('span', { key: 'email-icon', style: { marginRight: '8px' } }, '📧'),
            React.createElement('span', {
              key: 'email-text',
              style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
            }, formData.email)
          ]),
          formData.address && React.createElement('div', {
            key: 'address',
            style: {
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '8px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }
          }, [
            React.createElement('span', { key: 'address-icon', style: { marginRight: '8px' } }, '🗺️'),
            React.createElement('span', { key: 'address-text' }, formData.address)
          ]),
          formData.links?.linkedin && React.createElement('div', {
            key: 'linkedin',
            style: {
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '8px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }
          }, [
            React.createElement('span', { key: 'linkedin-icon', style: { marginRight: '8px' } }, '🔗'),
            React.createElement('span', {
              key: 'linkedin-text',
              style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
            }, formData.links.linkedin)
          ]),
          formData.links?.github && React.createElement('div', {
            key: 'github',
            style: {
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '8px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }
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
        style: { marginTop: '24px', position: 'relative', zIndex: 10 }
      }, [
        React.createElement('h3', {
          key: 'skills-title',
          style: {
            fontWeight: 600,
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: '4px'
          }
        }, 'Skills'),
        React.createElement('div', {
          key: 'skills-list',
          style: { display: 'flex', flexDirection: 'column', gap: '12px' }
        }, formData.skills.map((skill, index) =>
          React.createElement('div', {
            key: `skill-${index}`,
            style: { fontSize: '14px' }
          }, [
            React.createElement('div', { key: 'skill-name', style: { margin: 0 } }, skill),
            React.createElement('div', {
              key: 'skill-bar',
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                height: '6px',
                borderRadius: '9999px',
                marginTop: '4px',
                overflow: 'hidden'
              }
            }, [
              React.createElement('div', {
                key: 'skill-progress',
                style: {
                  backgroundColor: 'white',
                  height: '100%',
                  borderRadius: '9999px',
                  width: '85%'
                }
              })
            ])
          ])
        ))
      ]),

      // Languages
      formData.languages.length > 0 && React.createElement('div', {
        key: 'languages',
        style: { marginTop: '24px', position: 'relative', zIndex: 10 }
      }, [
        React.createElement('h3', {
          key: 'languages-title',
          style: {
            fontWeight: 600,
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: '4px'
          }
        }, 'Languages'),
        React.createElement('div', {
          key: 'languages-list',
          style: { display: 'flex', flexDirection: 'column', gap: '12px' }
        }, formData.languages.map((language, index) =>
          React.createElement('div', {
            key: `language-${index}`,
            style: { fontSize: '14px' }
          }, [
            React.createElement('div', { key: 'language-name', style: { margin: 0 } }, language),
            React.createElement('div', {
              key: 'language-bar',
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                height: '6px',
                borderRadius: '9999px',
                marginTop: '4px',
                overflow: 'hidden'
              }
            }, [
              React.createElement('div', {
                key: 'language-progress',
                style: {
                  backgroundColor: 'white',
                  height: '100%',
                  borderRadius: '9999px',
                  width: '90%'
                }
              })
            ])
          ])
        ))
      ])
    ]),

    // Main Content
    React.createElement('div', {
      key: 'main-content',
      style: {
        width: '60%',
        padding: '24px',
        backgroundColor: '#f9fafb'
      }
    }, [
      // Summary
      React.createElement('div', {
        key: 'summary',
        style: { marginBottom: '32px' }
      }, [
        React.createElement('h3', {
          key: 'summary-title',
          style: {
            color: '#f97316',
            fontWeight: 'bold',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }
        }, [
          'About Me',
          React.createElement('div', {
            key: 'summary-line',
            style: { flex: 1, height: '2px', backgroundColor: '#d1d5db', marginLeft: '16px' }
          })
        ]),
        React.createElement('p', {
          key: 'summary-text',
          style: {
            color: '#374151',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0
          }
        }, formData.summary)
      ]),

      // Experience
      formData.experience.length > 0 && React.createElement('div', {
        key: 'experience',
        style: { marginBottom: '32px' }
      }, [
        React.createElement('h3', {
          key: 'experience-title',
          style: {
            color: '#f97316',
            fontWeight: 'bold',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }
        }, [
          'Experience',
          React.createElement('div', {
            key: 'experience-line',
            style: { flex: 1, height: '2px', backgroundColor: '#d1d5db', marginLeft: '16px' }
          })
        ]),
        React.createElement('div', {
          key: 'experience-list',
          style: { display: 'flex', flexDirection: 'column', gap: '16px' }
        }, formData.experience.map((exp, index) =>
          React.createElement('div', {
            key: `exp-${index}`,
            style: {
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #facc15'
            }
          }, [
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
                color: '#f97316',
                fontSize: '12px',
                fontWeight: 500,
                marginBottom: '4px',
                margin: 0
              }
            }, `${exp.company} • ${exp.duration}`),
            exp.description && React.createElement('div', {
              key: 'description',
              style: {
                color: '#6b7280',
                fontSize: '14px',
                margin: 0
              }
            }, exp.description)
          ])
        ))
      ]),

      // Education
      formData.education.length > 0 && React.createElement('div', {
        key: 'education',
        style: { marginBottom: '32px' }
      }, [
        React.createElement('h3', {
          key: 'education-title',
          style: {
            color: '#f97316',
            fontWeight: 'bold',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }
        }, [
          'Education',
          React.createElement('div', {
            key: 'education-line',
            style: { flex: 1, height: '2px', backgroundColor: '#d1d5db', marginLeft: '16px' }
          })
        ]),
        React.createElement('div', {
          key: 'education-list',
          style: { display: 'flex', flexDirection: 'column', gap: '12px' }
        }, formData.education.map((edu, index) =>
          React.createElement('div', {
            key: `edu-${index}`,
            style: {
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }
          }, [
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
                color: '#f97316',
                fontSize: '12px',
                fontWeight: 500,
                margin: 0
              }
            }, `${edu.college} • ${edu.year}`),
            edu.marks && React.createElement('div', {
              key: 'marks',
              style: {
                color: '#6b7280',
                fontSize: '12px',
                marginTop: '4px',
                margin: 0
              }
            }, `Marks: ${edu.marks}`)
          ])
        ))
      ]),

      // Projects
      formData.projects.length > 0 && React.createElement('div', {
        key: 'projects',
        style: { marginBottom: '32px' }
      }, [
        React.createElement('h3', {
          key: 'projects-title',
          style: {
            color: '#f97316',
            fontWeight: 'bold',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }
        }, [
          'Projects',
          React.createElement('div', {
            key: 'projects-line',
            style: { flex: 1, height: '2px', backgroundColor: '#d1d5db', marginLeft: '16px' }
          })
        ]),
        React.createElement('div', {
          key: 'projects-list',
          style: { display: 'grid', gap: '12px' }
        }, formData.projects.map((project, index) =>
          React.createElement('div', {
            key: `project-${index}`,
            style: {
              backgroundColor: 'white',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }
          }, [
            React.createElement('div', {
              key: 'name',
              style: {
                fontWeight: 600,
                color: '#1f2937',
                fontSize: '14px',
                marginBottom: '4px',
                margin: 0
              }
            }, project.name),
            project.link && React.createElement('div', {
              key: 'link',
              style: {
                color: '#f97316',
                fontSize: '12px',
                marginBottom: '4px',
                margin: 0
              }
            }, `Link: ${project.link}`),
            React.createElement('div', {
              key: 'description',
              style: {
                color: '#6b7280',
                fontSize: '14px',
                margin: 0
              }
            }, project.description)
          ])
        ))
      ])
    ])
  ]);
};

module.exports = Template3;
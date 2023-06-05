// import { FormTrash } from 'grommet-icons';
export const customTheme = {
  global: {
    breakpoints: {
      small: {
        value: 768,
      },
      medium: {
        value: 1024,
      },
      large: {
        value: 1280,
      },
    },
    font: {
      family: "'Roboto', sans-serif;",
      size: '16px',
      color: 'dark-3',
    },
    colors: {
      brand: '#1E90FF',
    },
    focus: {
      border: {
        color: 'transparent',
      },
      shadow: {
        color: 'transparent',
        size: '0px',
      },
      outline: {
        color: 'transparent',
        size: '0px',
      },
    },
    drop: {
      background: '#ffffff',
      border: {
        width: '0px',
        radius: '0px',
      },
      shadowSize: 'small',
      zIndex: '20',
    },
  },
  button: {
    border: {
      radius: '0px',
    },
    default: {},
    padding: {
      vertical: '8px',
      horizontal: '12px',
    },
    hover: {
      secondary: {
        color: '#FFFFFF',
        background: { color: '#2C325F' },
      },
      primary: {
        color: '#FFFFFF',
        background: { color: '#67C5EB' },
      },
      disabled: {
        color: 'light-4',
        background: { color: '#67C5EB' },
      },
      bordered: {
        color: 'light-4',
        background: { color: '#67C5EB' },
      },
    },
    size: {
      large: {
        border: {
          radius: '0px',
        },
        pad: {
          horizontal: '26px',
          vertical: '10px',
        },
        fontSize: '14px',
      },
      medium: {
        border: {
          radius: '0px',
        },
        pad: {
          horizontal: '16px',
          vertical: '8px',
        },
      },
      small: {
        border: {
          radius: '0px',
        },
        pad: {
          horizontal: '12px',
          vertical: '6px',
        },
      },
      xsmall: {
        border: {
          radius: '0px',
        },
        padding: '10px 16px',
      },
    },
    primary: {
      color: '#FFFFFF',
      background: {
        color: 'brand',
      },
    },

    secondary: {
      color: '#FFFFFF',
      background: {
        color: 'brand',
      },
    },
    // disabled: {
    //   color: '#FFFFFF',
    //   background: {
    //     color: 'dark-4',
    //   },
    //   border: {
    //     radius: '0px',
    //   },
    // },
    bordered: {
      color: 'dark-1',
      background: {
        color: '#FFFFFF',
      },
      border: {
        width: '2px',
        color: 'brand',
      },
    },

    extend: (props: any) => {
      if (props.plain && props.primary) {
        return `
              border-style: solid;
              border-width: 2px;
              padding: 10px;
              border-color:  #41B6E6;
              
              &:hover {
                 color:  #FFFFFF;
                  background: #41B6E6;
          }`;
      }
      if (props.plain && !props.primary && props.secondary) {
        return `
              border-style: solid;
              border-width: 2px;
              padding: 10px;
              border-color:  #41B6E6;
  
              &:hover {
                 color:  #FFFFFF;
                  background: #41B6E6;
          }`;
      }
      return;
    },
  },
  formField: {
    content: {
      margin: {
        vertical: '10px',
      },
      size: '16',
      pad: undefined,
    },
    // border: {
    //   color: 'light-3',
    //   error: {
    //     color: {
    //       dark: 'status-critical',
    //     },
    //   },
    //   side: 'all',
    // },
    disabled: {
      background: {
        color: undefined,
      },
      border: {
        color: 'light-1',
      },
      label: {
        color: 'dark-4',
        size: '18px',
        fontWeight: 'bold',
      },
    },
    error: {
      background: {
        color: 'status-critical',
      },
      border: {
        color: 'status-error',
      },
      container: {
        gap: 'xsmall',
      },
      size: 'small',
      color: 'status-error',
      margin: {
        bottom: 'xsmall',
        top: 'none',
        horizontal: 'none',
      },
    },
    focus: {
      border: {
        size: 'xsmall',
        color: 'brand',
      },
    },
    help: {
      size: '14px',
      color: 'dark-4',
      margin: 'none',
    },
    info: {
      size: 'xsmall',
      container: {
        align: 'center',
        background: 'dark-1',
        pad: { horizontal: 'small' },
        margin: { top: 'small' },
      },
    },
    label: {
      size: 'small',
      color: 'dark-1',
      margin: {
        bottom: 'none',
        top: 'xsmall',
        horizontal: 'none',
      },
      requiredIndicator: true,
      weight: 600,
    },
    margin: {
      bottom: 'none',
    },
    round: '0px',
  },
  // textInput: {
  //   color: 'dark-1',
  //   extend: {
  //     backgroundColor: '#444',
  //     borderColor: '#EDEDED',
  //     fontSize: '16px',
  //     '&:focus': {
  //       outline: 'none',
  //       borderColor: 'none',
  //     },
  //     margin: { vertical: 'xsmall' },
  //     pad: undefined,
  //   },
  // },
  checkBox: {
    pad: 'small',
    size: '20px',
    fontWeight: '400',
    color: 'brand',
    border: {
      color: 'brand',
      width: '1px',
      radius: '0px',
    },
    check: {
      thickness: '2px',
      radius: '0px',
    },
    hover: {
      border: {
        color: 'brand',
      },
    },

    toggle: {
      background: 'light-2',
      color: {
        border: {
          color: 'light-3',
          thickness: '2px',
        },
        dark: 'dark-4',
        light: '#d9d9d9',
      },
      radius: '24px',
      size: '48px',
      knob: {},
    },
    extend: `
        color: #333333;
      `,
  },
};

export default customTheme;

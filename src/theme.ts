import { FormPrevious, FormNext, FormTrash } from 'grommet-icons';
import { ThemeType } from 'grommet/themes';
import { deepFreeze } from 'grommet/utils';
import { css } from 'styled-components';

// @ts-ignore
const customTheme: ThemeType = deepFreeze({
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
    colors: {
      brand: '#41B6E6',
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
    },

    animation: {
      duration: '1s',
      jiggle: {
        duration: '0.1s',
      },
    },
    borderSize: {
      xsmall: '1px',
      small: '2px',
      medium: '4px',
      large: '12px',
      xlarge: '24px',
    },
    control: {
      border: {
        color: 'light-4',
        radius: '0px',
        focus: {
          border: {
            color: 'brand',
          },
        },
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
    input: {
      color: 'dark-2',
      font: {
        weight: 'xsmall',
        color: 'light-4',
        size: '16px',
        height: 'small',
      },
      padding: {
        top: '8px',
        right: '8px',
        left: '12px',
        bottom: '8px',
        vertical: '8px',
      },
    },
    focus: {
      outline: {
        color: 'none',
        size: '0px',
      },
      shadow: {
        color: 'none',
        size: '0px',
      },
      border: {
        color: 'none',
      },
    },

    dateInput: {
      color: 'light-3',
      icon: {
        size: 'small',
      },
      text: {
        size: '15',
      },
    },

    fileInput: {
      border: {
        size: 'xsmall',
      },
      button: {
        border: {
          radius: '4px',
        },
        pad: {
          vertical: '6px',
          horizontal: '12px',
        },
        color: 'light-2',
        font: {
          size: '16px',
        },
        hover: {
          background: 'background-contrast',
        },
      },
      dragOver: {
        background: 'background-contrast',
        border: 'none',
      },
      hover: {
        border: {
          color: 'brand',
        },
      },
      icons: {
        remove: FormTrash,
      },
      message: {
        color: 'light-1',
      },
      pad: { horizontal: 'xsmall' },
      extend: 'border-radius: 4px;',
    },
    calendar: {
      small: {
        fontSize: '14px',
        lineHeight: 1,
        daySize: '27.428571428571427px',
        slideDuration: '0.2s',
        color: 'brand',
      },
      medium: {
        fontSize: '18px',
        lineHeight: 1.45,
        daySize: '54.857142857142854px',
        slideDuration: '0.5s',
        color: 'brand',
      },
      large: {
        fontSize: '30px',
        lineHeight: 1.11,
        daySize: '109.71428571428571px',
        slideDuration: '0.8s',
        color: 'brand',
      },
      icons: {
        small: {},
      },
    },
    font: {
      family: "'Roboto', sans-serif;",
      size: '16px',
    },
  },

  // OTHERS
  notification: {
    container: {
      background: 'light-1',
      elevation: 'small',
    },
    title: {
      color: 'dark-2',
    },
    message: {
      color: 'dark-3',
    },
    toast: {
      time: 8000,
    },
  },

  /* Start of formField */

  formField: {
    content: {
      margin: {
        vertical: '10px',
      },
      size: '16',
      pad: undefined,
    },
    border: {
      color: 'light-3',
      error: {
        color: {
          dark: 'status-critical',
        },
      },
      side: 'all',
    },
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
        color: 'validation-critical',
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
  /* End of formField */

  /* Start of Heading, Text, Paragraph styles */
  heading: {
    level: {
      1: {
        medium: {
          size: '48px',
        },
      },
      2: {
        medium: {
          size: '38px',
        },
      },
      3: {
        medium: {
          size: '32px',
        },
      },
      4: {
        medium: {
          size: '24px',
          height: '24px',
        },
      },
      5: {
        medium: {
          size: '20px',
          height: '24px',
        },
      },
    },
    weight: 600,
  },
  paragraph: {
    medium: {
      size: '16px',
      height: '20px',
    },
    large: {
      size: '20px',
      height: '24px',
    },
    small: {
      size: '14px',
      height: '16px',
    },
  },

  text: {
    xsmall: {
      size: '12px',
      height: '16px',
      maxWidth: '288px',
    },
    small: {
      size: '16px',
      height: '16px',
      maxWidth: '336px',
    },
    medium: {
      size: '18px',
      height: '24px',

      maxWidth: '432px',
    },
    large: {
      size: '22px',
      height: '28px',
      maxWidth: '528px',
    },
  },
  /* Start of Accordion */
  accordion: {
    icons: {
      color: 'brand',
    },
    heading: {
      level: '4',
      margin: '20px',
    },
    hover: {
      heading: {
        color: 'brand-two',
      },
    },
  },

  /* End of Accordion */

  /* Star of Menu */
  menu: {
    icons: {
      color: 'brand',
    },
  },
  /* End of Menu */

  /* Start of Tabs */
  tab: {
    margin: 'none',
    color: 'dark-2',
    fontWeight: 700,
    active: {
      color: 'brand',
    },
    hover: {
      color: 'brand',
    },
    border: {
      side: 'bottom',
      size: 'small',
      color: {
        dark: 'brand-two',
        light: 'none',
      },
      active: {
        color: {
          dark: 'white',
          light: 'brand',
        },
      },
      hover: {
        color: 'brand',
      },
    },
  },
  tabs: {
    gap: 'large',
    background: {},
    header: {
      background: '#FFF',
      extend: () => css`
        font-weight: 800;
      `,
    },
  },
  /* End of Tabs*/

  /* End of Heading, Paragraph, Text styles*/
  anchor: {
    textDecoration: 'none',
    fontWeight: 400,
    fontSize: '16px',
    color: {
      dark: 'brand-two',
      light: 'brand',
    },
    hover: {
      textDecoration: 'underline',
      fontWeight: 400,
      border: '1px solid #d0d0d0',
    },
    disabled: {
      color: 'light-4',
    },
    extend: `
      outline: 'none'
    `,
  },

  /* End of Text */
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
        color: 'brand-two',
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
        color: 'brand-two',
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
  /* Inputs */

  radioButton: {
    color: 'brand',
    border: {
      color: {
        dark: 'brand',
      },
      width: '2px',
    },
    check: {
      radius: '100%',
      color: 'brand',
    },
    hover: {
      border: {
        color: 'brand',
      },
    },
    icon: {},
    icons: {},
    gap: 'small',
    size: '24px',
  },

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
        color: 'brand ',
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

  select: {
    background: 'light-1',
    control: {
      extend: {
        //border: 'none',
      },
    },
    icons: {
      color: 'brand',
    },
    options: {
      container: {},
      box: {
        align: 'start',
        pad: 'small',
      },
      text: {
        margin: 'none',
      },
    },
    step: 20,
  },

  textInput: {
    extend: {
      backgroundColor: '#F8F8F8',
      borderColor: '#EDEDED',
      fontSize: '16px',
      '&:focus': {
        outline: 'none',
        borderColor: '#41B6E6',
      },
      margin: { vertical: 'xsmall' },
      pad: undefined,
    },
  },

  textArea: {
    extend: {
      backgroundColor: '#F8F8F8',
      borderColor: '#EDEDED',
      fontSize: '16px',
      '&:focus': {
        outline: 'none',
        borderColor: '#41B6E6',
      },
      margin: { vertical: 'xsmall' },
      pad: undefined,
    },
  },

  tag: {
    background: undefined,
    border: true,
    round: 'large',
    pad: {
      horizontal: 'small',
      vertical: '0px',
    },
    remove: {
      margin: { right: 'small', top: '1px' },
    },
    separator: ' : ',
    text: {
      size: '14px',
      weight: 400,
    },
    value: {
      size: '12px',
      weight: 400,
      color: 'dark-3',
    },
  },

  rangeInput: {
    thumb: {
      extend: {
        width: 20,
        height: 20,
        top: 2,
      },
    },
  },
  dataTable: {
    header: {
      font: {
        size: 'small',
        weight: 'bold',
      },
    },

    pinned: {
      header: {
        extend: {
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
        },
      },
    },
  },
  pagination: {
    container: {
      extend: (css: any) => ({
        ...css,
        minHeight: 'unset',
      }),
    },
    button: {
      color: 'dark-3',
      border: {
        color: 'light-6',
        width: 0,
        radius: 0,
      },
      active: {
        background: {
          color: 'brand',
        },
        color: 'light-1',
      },
      hover: {
        background: {
          color: 'brand',
        },
      },
      size: {
        small: {
          border: {
            radius: '0',
          },
        },
        medium: {
          border: {
            radius: '0',
          },
        },
        large: {
          border: {
            radius: '0',
          },
        },
      },
    },
    controls: {
      gap: 'xsmall',
    },
    icons: {
      previous: FormPrevious,
      next: FormNext,
    },
  },
  tip: {
    content: {
      background: 'light-3',
    },
  },
});

export default customTheme;

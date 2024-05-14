// import { withKnobs } from '@storybook/addon-knobs';

// import { caseOpConfig, operatorDetails } from './mock.stories';

// import FusionAixComponentsFxChatGenAi from './index.tsx';

// export default {
//   title: 'FusionAixComponentsFxChatGenAi',
//   decorators: [withKnobs],
//   component: FusionAixComponentsFxChatGenAi
// };

// if (!window.PCore) {
//   window.PCore = {};
// }

// window.PCore.getUserApi = () => {
//   return {
//     getOperatorDetails: () => {
//       return new Promise(resolve => {
//         resolve(operatorDetails);
//       });
//     }
//   };
// };

// export const BaseFusionAixComponentsFxChatGenAi = () => {

//   const props = {
//     ...caseOpConfig,
//     getPConnect: () => {
//       return {
//         getActionsApi: () => {
//           return {
//             updateFieldValue: () => {/* nothing */},
//             triggerFieldChange: () => {/* nothing */}
//           };
//         },
//         ignoreSuggestion: () => {/* nothing */},
//         acceptSuggestion: () => {/* nothing */},
//         setInheritedProps: () => {/* nothing */},
//         resolveConfigProps: () => {/* nothing */}
//       };
//     }
//   };

//   return (
//     <>
//       <FusionAixComponentsFxChatGenAi {...props} />
//     </>
//   );
// };




// // import type { StoryObj } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs';
// import FusionAixComponentsFxChatGenAi from './index';

// export default {
//   title: 'Widgets/Chat GenAI',
//   argTypes: {
//     dataPage: {
//       table: {
//         disable: true
//       }
//     },
//     getPConnect: {
//       table: {
//         disable: true
//       }
//     }
//   },
//   component: FusionAixComponentsFxChatGenAi
// };

// /* Set this value to false to call an external API instead of using a simulated answer */
// const simulateGenAIResponse = true;

// const sleep = (m) =>
//   new Promise(r => {
//     setTimeout(r, m);
//   });

// // type ChatItem = {
// //   role: string;
// //   content: string;
// // };

// /* Sample function to call a GenAI endpoint to simulate real response */
// async function getRealGenAIResponse(message) {
//   const chats= [];
//   message.forEach(msg => {
//     chats.push({ role: 'user', content: msg });
//   });
//   const response = await fetch('http://localhost:8000/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ chats })
//   });
//   const details = await response.json();
//   return Promise.resolve({ pyMessage: details.output.content });
// }

// const setPCore = () => {
//   (window).PCore = {
//     getDataPageUtils: () => {
//       return {
//         getPageDataAsync: async (
//           dataPageName,
//           context,
//           // parameters: { prompt }
//         ) => {
//           if (simulateGenAIResponse) {
//             await sleep(2000);
//             return await Promise.resolve({
//               pyMessage: `Thanks for asking about '${parameters.prompt}' but I don't know the answer`
//             });
//           } else {
//             const chats = JSON.parse(parameters.prompt);
//             return getRealGenAIResponse(chats);
//           }
//         }
//       };
//     }
//   };
// };

// // type Story = StoryObj<typeof FusionAixComponentsFxChatGenAi>;
// export const Default = {
//   render: args => {
//     setPCore();
//     const props = {
//       ...args,
//       getPConnect: () => {
//         return {
//           getContextName: () => ''
//         };
//       }
//     };
//     return <FusionAixComponentsFxChatGenAi {...props} />;
//   },
//   args: {
//     heading: 'AI Assistant',
//     maxHeight: 'auto',
//     sendAllUserContext: false,
//     dataPage: ''
//   }
// };





import  { StoryObj } from '@storybook/react';
import FusionAixComponentsFxChatGenAi from './index';
import React from 'react';

export default {
  title: 'Widgets/Chat GenAI',
  argTypes: {
    dataPage: {
      table: {
        disable: true
      }
    },
    getPConnect: {
      table: {
        disable: true
      }
    }
  },
  component: FusionAixComponentsFxChatGenAi
};

/* Set this value to false to call an external API instead of using a simulated answer */
const simulateGenAIResponse = true;

const sleep = (m) =>
  new Promise(r => {
    setTimeout(r, m);
  });

 ChatItem = {
  role: string,
  content: string
};

/* Sample function to call a GenAI endpoint to simulate real response */
async function getRealGenAIResponse(message) {
  const chats = [];
  message.forEach(msg => {
    chats.push({ role: 'user', content: msg });
  });
  const response = await fetch('http://localhost:8000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chats })
  });
  const details = await response.json();
  return Promise.resolve({ pyMessage: details.output.content });
}

const setPCore = () => {
  (window).PCore = {
    getDataPageUtils: () => {
      return {
        getPageDataAsync: (
          dataPageName,
          context,
          parameters
        ) => {
          if (simulateGenAIResponse) {
            return sleep(2000).then(() => {
              return Promise.resolve({
                pyMessage: `Thanks for asking about '${parameters.prompt}' but I don't know the answer`
              });
            });
          } else {
            const chats = JSON.parse(parameters.prompt);
            return getRealGenAIResponse(chats);
          }
        }
      };
    }
  };
};
 Story = StoryObj
export const Default = {
  render: args => {
    setPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getContextName: () => ''
        };
      }
    };
    return <FusionAixComponentsFxChatGenAi heading={''} dataPage={''} maxHeight={''} sendAllUserContext={false} {...props} />;
  },
  args: {
    heading: 'AI Assistant',
    maxHeight: 'auto',
    sendAllUserContext: false,
    dataPage: ''
  }
};

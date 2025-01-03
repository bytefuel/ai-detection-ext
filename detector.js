// class Test {
//     constructor() { }

//     // Function to check if the text is AI-generated using Sapling API
//     async checkIfAiGenerated(text) {
//         try {
//             const response = await fetch('https://api.sapling.ai/api/v1/aidetect', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     key: 'MSC61Q3CAMG4IGASAUB6OBKO9FMZPD7H', // Replace with your API key
//                     text: text,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error({ err: errorData.msg });
//                 return null; // Handle API errors
//             }

//             const data = await response.json();
//             return data; // Return the full response for tagging purposes
//         } catch (err) {
//             console.error('An error occurred:', err.message);
//             return null;
//         }
//     }
// }

// chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
//     const testRunner = new Test();
//     const processedPosts = new Set(); // Maintain a set of processed posts

//     // Get all post descriptions
//     const posts = document.querySelectorAll('.feed-shared-update-v2__description');

//     for (const post of posts) {
//         const postText = post.innerText;

//         console.log(postText);

//         // Skip processing if this post has already been checked
//         if (processedPosts.has(postText)) {
//             console.log('Post already processed:', postText);
//             continue;
//         } else {
//             // Check if the text is AI-generated
//             const result = await testRunner.checkIfAiGenerated(postText);

//             if (result && result.score !== undefined) {
//                 processedPosts.add(postText); // Mark this post as processed

//                 // Create a tag
//                 const tag = document.createElement('div');
//                 tag.style.position = 'absolute';
//                 tag.style.top = '10px';
//                 tag.style.right = '10px';
//                 tag.style.background = 'rgba(0, 0, 0, 0.8)';
//                 tag.style.color = '#fff';
//                 tag.style.padding = '5px 10px';
//                 tag.style.borderRadius = '5px';
//                 tag.style.cursor = 'pointer';
//                 tag.innerText = `${Math.round(result.score * 100)}% AI`;

//                 // Add event listener for popover
//                 tag.addEventListener('click', () => {
//                     const existingPopover = post.querySelector('.ai-popover');
//                     if (existingPopover) {
//                         existingPopover.remove(); // Remove if already open
//                         return;
//                     }

//                     const popover = document.createElement('div');
//                     popover.className = 'ai-popover';
//                     popover.style.position = 'absolute';
//                     popover.style.top = '40px';
//                     popover.style.right = '10px';
//                     popover.style.background = '#fff';
//                     popover.style.color = '#000';
//                     popover.style.border = '1px solid #ccc';
//                     popover.style.padding = '10px';
//                     popover.style.borderRadius = '5px';
//                     popover.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
//                     popover.style.zIndex = '1000000';
//                     popover.innerHTML = `
//                     <strong>Analysis:</strong><br>
//                     Text is likely <strong>${result.score > 0.9 ? 'AI-generated' : 'Human-written'}</strong><br>
//                     <small>Score: ${result.score}</small>
//                 `;

//                     // Add click-to-close functionality
//                     popover.addEventListener('click', () => {
//                         popover.remove();
//                     });

//                     post.appendChild(popover);
//                 });

//                 // Positioning relative to the post
//                 const postContainer = post.closest('.feed-shared-update-v2');
//                 if (postContainer) {
//                     postContainer.style.position = 'relative'; // Ensure relative positioning for absolute child
//                     postContainer.appendChild(tag);
//                 }
//             }
//         }


//     }
// });
// import { pipeline } from '@xenova/transformers';

// export class Test {
//     constructor() { }

//     async checkIfAiGenerated(text) {
//         try {
//             // Load the model and tokenizer
//             const detectAI = await pipeline('text-classification', 'Xenova/roberta-base-openai-detector');

//             // Perform inference
//             const results = await detectAI(text);

//             // The model returns an array of labels and scores
//             return results[0]; // Example: { label: "AI", score: 0.95 }
//         } catch (err) {
//             console.error('An error occurred during AI detection:', err);
//             return null;
//         }
//     }
// }

// chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
//     const testRunner = new Test();
//     const processedPosts = new Set();

//     const posts = document.querySelectorAll('.feed-shared-update-v2__description');

//     for (const post of posts) {
//         const postText = post.innerText;

//         console.log(postText);

//         if (processedPosts.has(postText)) {
//             console.log('Post already processed:', postText);
//             continue;
//         } else {
//             const result = await testRunner.checkIfAiGenerated(postText);

//             if (result && result.score !== undefined) {
//                 processedPosts.add(postText);

//                 const tag = document.createElement('div');
//                 tag.style.position = 'absolute';
//                 tag.style.top = '10px';
//                 tag.style.right = '10px';
//                 tag.style.background = 'rgba(0, 0, 0, 0.8)';
//                 tag.style.color = '#fff';
//                 tag.style.padding = '5px 10px';
//                 tag.style.borderRadius = '5px';
//                 tag.style.cursor = 'pointer';
//                 tag.innerText = `${Math.round(result.score * 100)}% AI`;

//                 tag.addEventListener('click', () => {
//                     const existingPopover = post.querySelector('.ai-popover');
//                     if (existingPopover) {
//                         existingPopover.remove();
//                         return;
//                     }

//                     const popover = document.createElement('div');
//                     popover.className = 'ai-popover';
//                     popover.style.position = 'absolute';
//                     popover.style.top = '40px';
//                     popover.style.right = '10px';
//                     popover.style.background = '#fff';
//                     popover.style.color = '#000';
//                     popover.style.border = '1px solid #ccc';
//                     popover.style.padding = '10px';
//                     popover.style.borderRadius = '5px';
//                     popover.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
//                     popover.style.zIndex = '1000000';
//                     popover.innerHTML = `
//                         <strong>Analysis:</strong><br>
//                         Text is likely <strong>${result.label === 'AI' ? 'AI-generated' : 'Human-written'}</strong><br>
//                         <small>Score: ${result.score}</small>
//                     `;

//                     popover.addEventListener('click', () => {
//                         popover.remove();
//                     });

//                     post.appendChild(popover);
//                 });

//                 const postContainer = post.closest('.feed-shared-update-v2');
//                 if (postContainer) {
//                     postContainer.style.position = 'relative';
//                     postContainer.appendChild(tag);
//                 }
//             }
//         }
//     }
// });


// chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
//     const processedPosts = new Set();

//     const posts = document.querySelectorAll('.feed-shared-update-v2__description');

//     for (const post of posts) {
//       const postText = post.innerText;

//       console.log(postText);

//       if (processedPosts.has(postText)) {
//         console.log('Post already processed:', postText);
//         continue;
//       } else {
//         try {
//           const response = await fetch('http://localhost:3000/detect-ai', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ text: postText }),
//           });

//           const result = await response.json();

//           // Ensure we handle the response correctly
//           if (result && result.labels && result.scores && result.labels.length > 0) {
//             // Get the score for both AI and Human labels
//             const aiScore = result.scores[result.labels.indexOf('AI')];
//             const humanScore = result.scores[result.labels.indexOf('Human')];

//             // Display both AI and Human percentages
//             const aiPercentage = Math.round(aiScore * 100);
//             const humanPercentage = Math.round(humanScore * 100);

//             processedPosts.add(postText);

//             const tag = document.createElement('div');
//             tag.style.position = 'absolute';
//             tag.style.top = '10px';
//             tag.style.right = '10px';
//             tag.style.background = 'rgba(0, 0, 0, 0.8)';
//             tag.style.color = '#fff';
//             tag.style.padding = '5px 10px';
//             tag.style.borderRadius = '5px';
//             tag.style.cursor = 'pointer';
//             tag.innerText = `AI: ${aiPercentage}% | Human: ${humanPercentage}%`;

//             tag.addEventListener('click', () => {
//               const existingPopover = post.querySelector('.ai-popover');
//               if (existingPopover) {
//                 existingPopover.remove();
//                 return;
//               }

//               const popover = document.createElement('div');
//               popover.className = 'ai-popover';
//               popover.style.position = 'absolute';
//               popover.style.top = '40px';
//               popover.style.right = '10px';
//               popover.style.background = '#fff';
//               popover.style.color = '#000';
//               popover.style.border = '1px solid #ccc';
//               popover.style.padding = '10px';
//               popover.style.borderRadius = '5px';
//               popover.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
//               popover.style.zIndex = '1000000';
//               popover.innerHTML = `
//                 <strong>Analysis:</strong><br>
//                 Text is likely <strong>${aiScore > humanScore ? 'AI-generated' : 'Human-written'}</strong><br>
//                 <small>AI Score: ${aiPercentage}%</small><br>
//                 <small>Human Score: ${humanPercentage}%</small>
//               `;

//               popover.addEventListener('click', () => {
//                 popover.remove();
//               });

//               post.appendChild(popover);
//             });

//             const postContainer = post.closest('.feed-shared-update-v2');
//             if (postContainer) {
//               postContainer.style.position = 'relative';
//               postContainer.appendChild(tag);
//             }
//           }
//         } catch (err) {
//           console.error('Error fetching AI classification:', err);
//         }
//       }
//     }
// });

// This function will handle the logic for processing posts
// async function processPosts() {
//     const processedPosts = new Set();
//     const posts = document.querySelectorAll('.feed-shared-update-v2__description');

//     for (const post of posts) {
//         const postText = post.innerText;

//         if (processedPosts.has(postText)) {
//             continue;
//         } else {
//             try {
//                 const response = await fetch('http://localhost:3000/detect-ai', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ text: postText }),
//                 });

//                 const result = await response.json();

//                 // Ensure we handle the response correctly
//                 if (result && result.labels && result.scores && result.labels.length > 0) {
//                     const aiScore = result.scores[result.labels.indexOf('AI')];
//                     const humanScore = result.scores[result.labels.indexOf('Human')];

//                     const aiPercentage = Math.round(aiScore * 100);
//                     const humanPercentage = Math.round(humanScore * 100);

//                     processedPosts.add(postText);

//                     const tag = document.createElement('div');
//                     tag.style.position = 'absolute';
//                     tag.style.top = '10px';
//                     tag.style.right = '10px';
//                     tag.style.background = 'rgba(0, 0, 0, 0.8)';
//                     tag.style.color = '#fff';
//                     tag.style.padding = '5px 10px';
//                     tag.style.borderRadius = '5px';
//                     tag.style.cursor = 'pointer';
//                     tag.innerText = `AI: ${aiPercentage}% | Human: ${humanPercentage}%`;

//                     tag.addEventListener('click', () => {
//                         const existingPopover = post.querySelector('.ai-popover');
//                         if (existingPopover) {
//                             existingPopover.remove();
//                             return;
//                         }

//                         const popover = document.createElement('div');
//                         popover.className = 'ai-popover';
//                         popover.style.position = 'absolute';
//                         popover.style.top = '40px';
//                         popover.style.right = '10px';
//                         popover.style.background = '#fff';
//                         popover.style.color = '#000';
//                         popover.style.border = '1px solid #ccc';
//                         popover.style.padding = '10px';
//                         popover.style.borderRadius = '5px';
//                         popover.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
//                         popover.style.zIndex = '1000000';
//                         popover.innerHTML = `
//                             <strong>Analysis:</strong><br>
//                             Text is likely <strong>${aiScore > humanScore ? 'AI-generated' : 'Human-written'}</strong><br>
//                             <small>AI Score: ${aiPercentage}%</small><br>
//                             <small>Human Score: ${humanPercentage}%</small>
//                         `;

//                         popover.addEventListener('click', () => {
//                             popover.remove();
//                         });

//                         post.appendChild(popover);
//                     });

//                     const postContainer = post.closest('.feed-shared-update-v2');
//                     if (postContainer) {
//                         postContainer.style.position = 'relative';
//                         postContainer.appendChild(tag);
//                     }
//                 }
//             } catch (err) {
//                 console.error('Error fetching AI classification:', err);
//             }
//         }
//     }
// }

// // Function to handle scroll event
// function handleScroll() {
//     const scrollThreshold = 200; // Pixels from the bottom to trigger loading
//     const nearBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY < scrollThreshold;

//     if (nearBottom) {
//         processPosts();  // Call the process function when the user scrolls near the bottom
//     }
// }

// // Attach the scroll event listener
// window.addEventListener('scroll', handleScroll);

// // Call the function once to process already loaded posts when the page is initially loaded
// processPosts();


// Keep track of already processed posts
const processedPosts = new Set();

// Function to handle the AI detection and display logic for a post
async function processPost(post) {
    const postText = post.innerText;
    if (processedPosts.has(postText)) {
        return; // Skip already processed post
    } else {
        processedPosts.add(postText);
    }

    try {
        const response = await fetch('http://localhost:3000/detect-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: postText }),
        });

        const result = await response.json();

        if (result && typeof result.ai_score === 'number' && typeof result.human_score === 'number') {
            const aiPercentage = Math.round(result.ai_score * 100);
            const humanPercentage = Math.round(result.human_score * 100);
            const postContainer = post.closest('.feed-shared-update-v2');
            // Create and append the tag to show the AI and Human percentages
            const tag = document.createElement('div');
            tag.style.position = 'absolute';
            tag.style.top = '10px';
            tag.style.right = '10px';
            tag.style.background = 'rgba(0, 0, 0, 0.8)';
            tag.style.color = '#fff';
            tag.style.padding = '5px 10px';
            tag.style.borderRadius = '5px';
            tag.style.cursor = 'pointer';
            tag.innerHTML = `
                AI: ${aiPercentage}% | Human: ${humanPercentage}%
                <small style="display: block; font-size: 10px;">*Results are estimates</small>
            `;

            // Add event listener for tag click to show detailed popover
            tag.addEventListener('click', () => {
                const postContainers = post.closest('.feed-shared-update-v2');
                const existingPopover = postContainers.querySelector('.ai-popover');
                if (existingPopover) {
                    // Remove the popover if it already exists
                    existingPopover.remove();
                    return;
                }

                // Create the popover if it doesn't exist
                const popover = document.createElement('div');
                popover.className = 'ai-popover';
                popover.style.position = 'absolute';
                popover.style.top = '0'; // Align with the top of the post
                popover.style.left = '580px'; // Position to the right of the post container
                popover.style.background = '#fff';
                popover.style.color = '#000';
                popover.style.border = '1px solid #ccc';
                popover.style.padding = '10px';
                popover.style.borderRadius = '5px';
                popover.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                popover.style.zIndex = '100';
                popover.style.width = '220px'; // Optional: Set a fixed width for consistency
                popover.innerHTML = `
        <strong>Analysis:</strong><br>
        Text is likely <strong>${result.result}</strong><br>
        <small>AI Score: ${aiPercentage}%</small><br>
        <small>Human Score: ${humanPercentage}%</small><br>
        <small style="color: #888;">*This analysis is not 100% accurate</small>
    `;

                // Add click event to remove the popover when clicked again
                popover.addEventListener('click', () => {
                    popover.remove();
                });

                // Append the popover to the post's container
                const postContainer = post.closest('.feed-shared-update-v2');
                if (postContainer) {
                    postContainer.style.position = 'relative'; // Ensure the container is relatively positioned
                    postContainer.appendChild(popover);
                }
            });



            
            if (postContainer) {
                postContainer.style.position = 'relative';
                postContainer.appendChild(tag);
            }
        }
    } catch (err) {
        console.error('Error fetching AI classification:', err);
    }
}

// Function to check and process visible posts
function checkAndProcessVisiblePosts() {
    const posts = document.querySelectorAll('.feed-shared-update-v2__description');
    posts.forEach(post => {
        if (isElementInViewport(post)) {
            processPost(post);
        }
    });
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the scroll event
function handleScroll() {
    checkAndProcessVisiblePosts();
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial call to process posts already visible when the page loads
checkAndProcessVisiblePosts();

<script>
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
  
    let element;
    let editor;
  
    onMount(() => {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
        ],
        content: '<p>Hello World! 🌍️ </p>',
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor;
        },
        editorProps: {
            attributes: {
            class: 'prose dark:prose-invert sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        }, 
      })
    });
  
    onDestroy(() => {
      if (editor) {
        editor.destroy()
      }
    });
  </script>
  
  <div class="mockup-window border bg-base-300">

    
      {#if editor}
        <div class="btn-group">
            <button
                on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                class="btn btn-sm"
                >
                H1
            </button>
            <button
                on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class="btn btn-sm"
                >
                H2
            </button>
            <button on:click={() => editor.chain().focus().setParagraph().run()} class="btn btn-sm">
                P
              </button>
        </div>
        
        
       
      {/if}
      
      <div bind:this={element} />
  </div>
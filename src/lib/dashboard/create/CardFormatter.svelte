<script>
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import TextAlign from '@tiptap/extension-text-align';
    import Button from '../../components/interface/Button.svelte';
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';

    export let form;
    export let deck;
    export let frontEditor;
    export let backEditor;
    
    let frontContent;
    let backContent;
    let frontElement;
    let backElement;
    let created = false;
    let createdIntervalID;
    let createdNotificationTimes = 0;

    createdIntervalID = setInterval(() => {
      if (created && createdNotificationTimes < 1) {
        createdNotificationTimes += 1;
      } else {
        created = false;
      }
    }, 500);


    $: frontContent = frontEditor?.getHTML()
    $: backContent = backEditor?.getHTML()

    onMount(() => {
      frontEditor = new Editor({
        element: frontElement,
        extensions: [
          StarterKit,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
        ],
        content: deck.frontTemplate,
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          frontEditor = frontEditor;
        },
        editorProps: {
            attributes: {
            class: 'prose dark:prose-invert max-w-none p-5 focus:outline-none',
            },
        }, 
      })

      backEditor = new Editor({
        element: backElement,
        extensions: [
          StarterKit,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
        ],
        content: deck.backTemplate,
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          backEditor = backEditor;
        },
        editorProps: {
            attributes: {
            class: 'prose dark:prose-invert max-w-none p-5 focus:outline-none',
            },
        }, 
      })
    });

    function handleClick() {
      created = true;
      createdNotificationTimes = 0;
    }

    onDestroy(() => {
      if (frontEditor) {
        frontEditor.destroy()
      }
      if (backEditor) {
        backEditor.destroy()
      }
    });
</script>
  

  <div class="flex flex-col w-full md:w-2/3 space-y-4 ">
    
      <div class="flex md:ml-8">
        <h2 class="text-xl font-bold">Front format</h2>
      </div>
      
      <div class="flex flex-col w-full md:w-full items-start border-4 border-neutral-800">
        
        {#if frontEditor}
            <div class="btn-group bg-base-200 w-full flex-wrap">
              <button type="button" on:click={() => frontEditor.chain().focus().toggleHeading({ level: 1 }).run()} class="btn btn-sm btn-ghost">
                h1
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().toggleHeading({ level: 2 }).run()} class="btn btn-sm btn-ghost" >
                h2
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().toggleHeading({ level: 3 }).run()} class="btn btn-sm btn-ghost" >
                h3
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().setParagraph().run()} class="btn btn-sm btn-ghost" >
                paragraph
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().toggleBold().run()} class="btn btn-sm btn-ghost" >
                bold
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().toggleItalic().run()} class="btn btn-sm btn-ghost" >
                italic
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().setTextAlign('left').run()} class="btn btn-sm btn-ghost" >
                left
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().setTextAlign('center').run()} class="btn btn-sm btn-ghost" >
                center
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().setTextAlign('right').run()} class="btn btn-sm btn-ghost" >
                right
              </button>
              <button type="button" on:click={() => frontEditor.chain().focus().setTextAlign('justify').run()} class="btn btn-sm btn-ghost" >
                justify
              </button>
            </div>
        {/if}
        <div bind:this={frontElement} class="w-full min-h-16"/>
            
      </div>
  
      <div class="flex md:ml-8">
        <h2 class="text-xl font-bold">Back format</h2>
      </div>
      <div class="flex flex-col w-full md:w-full items-start border-4 border-neutral-800">
      
        {#if backEditor}
            <div class="btn-group bg-base-200 w-full flex-wrap">
              <button type="button" on:click={() => backEditor.chain().focus().toggleHeading({ level: 1 }).run()} class="btn btn-sm btn-ghost">
                h1
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().toggleHeading({ level: 2 }).run()} class="btn btn-sm btn-ghost" >
                h2
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().toggleHeading({ level: 3 }).run()} class="btn btn-sm btn-ghost" >
                h3
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().setParagraph().run()} class="btn btn-sm btn-ghost" >
                paragraph
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().toggleBold().run()} class="btn btn-sm btn-ghost" >
                bold
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().toggleItalic().run()} class="btn btn-sm btn-ghost" >
                italic
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().setTextAlign('left').run()} class="btn btn-sm btn-ghost" >
                left
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().setTextAlign('center').run()} class="btn btn-sm btn-ghost" >
                center
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().setTextAlign('right').run()} class="btn btn-sm btn-ghost" >
                right
              </button>
              <button type="button" on:click={() => backEditor.chain().focus().setTextAlign('justify').run()} class="btn btn-sm btn-ghost" >
                justify
              </button>
            </div>
        {/if}
        <div bind:this={backElement} class="w-full min-h-16"/>
            
      </div>
      <form method="post" use:enhance action="?/updateFormat">

        <input bind:value={frontContent} name="frontTemplate" hidden/>
        <input bind:value={backContent} name="backTemplate" hidden/>

        <div class="flex flex-col justify-center">

          <div class="flex justify-center">
            <Button buttonSize='md' on:click={handleClick}>Update format</Button>
          </div>
          <div class="flex justify-center" >
            {#if created}
              <p transition:fade="{{duration:200}}" class="text-md italic">Format updated</p>
            {/if}
          </div>
          
        </div>
    </form>
  </div>
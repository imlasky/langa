
<script>

    export let buttonText = 'Button Text';
    export let buttonSize = 'md';
    let className = "rounded-full font-bold uppercase border-4 border-neutral-800 hover:shadow-[-6px_-6px_0px_0px_rgb(38,38,38)] transition-shadow";
    
    switch (buttonSize) {
        case 'sm':
            className = className.concat(" p-2 text-sm");
            break;
        case 'md':
            className = className.concat(" p-3 text-md");
            break;
        case 'lg':
            className = className.concat(" p-4 text-lg");
            break;
        case 'xl':
            className = className.concat(" p-4 text-xl");
            break;
        default:
            break;
    }

    
</script>

<button class={className} >
    {buttonText}
</button>
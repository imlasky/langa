
<script>

    export let buttonText = 'Button Text';
    export let buttonSize = 'md';
    let className = "rounded-full font-bold uppercase border-4 border-neutral-800 hover:shadow-[-3px_3px_0px_0px] hover:shadow-primary hover:border-primary transition-all hover:text-primary hover:translate-x-1 hover:-translate-y-1";
    
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

<button class={className}>
    {buttonText}
</button>
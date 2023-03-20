<script>

    let tabs = [
      'Create',
      'Upload',
      'Manage',
    ];
    let selectedTab = 0;
    let selectAll;

    let decks = ['row 1', 'row 2', 'row 3', 'row 4']
    let selectedDecks = [];

    $: selectedDecks = selectAll ? decks : [];



</script>


const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        // Create li element
        const li = document.createElement('li');

        // Create delete button
        const deleteButton = document.createElement('button');

        // Populate li element with input value
        li.textContent = input.value;

        // Populate delete button with ❌
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // Append delete button to li
        li.append(deleteButton);

        // Append li to unordered list
        list.append(li);

        // Add event listener to delete button
        deleteButton.addEventListener('click', function() {
            li.remove();
            input.focus();
        });

        // Clear input field
        input.value = '';
    }

    // Return focus to input field
    input.focus();
});
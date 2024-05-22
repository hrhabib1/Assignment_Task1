document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');

// random color generate
    function createRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

// partition create
    function createPartition(parent, left, top, width, height, color) {
        const partition = document.createElement('div');
        partition.classList.add('partition');
        partition.style.left = left + '%';
        partition.style.top = top + '%';
        partition.style.width = width + '%';
        partition.style.height = height + '%';
        partition.style.backgroundColor = color;

        const controls = document.createElement('div');
        controls.classList.add('controls');

        const vButton = document.createElement('button');
        vButton.innerText = 'V';
        const hButton = document.createElement('button');
        hButton.innerText = 'H';
        const removeButton = document.createElement('button');
        removeButton.innerText = '-';

        controls.appendChild(vButton);
        controls.appendChild(hButton);
        controls.appendChild(removeButton);

        partition.appendChild(controls);
        parent.appendChild(partition);

        vButton.addEventListener('click', () => splitPartition(partition, 'vertical'));
        hButton.addEventListener('click', () => splitPartition(partition, 'horizontal'));
        removeButton.addEventListener('click', () => removePartition(partition));

        makeResizable(partition);
    }

// slpit partion
    function splitPartition(partition, direction) {
        const rect = partition.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        const left = (rect.left - parentRect.left) / parentRect.width * 100;
        const top = (rect.top - parentRect.top) / parentRect.height * 100;
        const width = rect.width / parentRect.width * 100;
        const height = rect.height / parentRect.height * 100;
        const color = partition.style.backgroundColor;

        if (direction === 'vertical') {
            const newWidth = width / 2;
            partition.style.width = newWidth + '%';
            createPartition(container, left + newWidth, top, newWidth, height, createRandomColor());
        } else if (direction === 'horizontal') {
            const newHeight = height / 2;
            partition.style.height = newHeight + '%';
            createPartition(container, left, top + newHeight, width, newHeight, createRandomColor());
        }
    }

// remove pertition
    function removePartition(partition) {
        partition.remove();
    }

// resize
    function makeResizable(element) {
        element.addEventListener('mousedown', function (e) {
            e.preventDefault();
            const initialMouseX = e.clientX;
            const initialMouseY = e.clientY;
            const initialWidth = element.offsetWidth;
            const initialHeight = element.offsetHeight;

            function onMouseMove(e) {
                const newWidth = initialWidth + (e.clientX - initialMouseX);
                const newHeight = initialHeight + (e.clientY - initialMouseY);

                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

// Initial partition
    createPartition(container, 0, 0, 100, 100, createRandomColor());
});

import './sources.css';

interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (!sourceItemTemp) {
            console.error('element sourceItemTemp not found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const itemNameElement = sourceClone.querySelector('.source__item-name') as HTMLElement | null;
            const itemElement = sourceClone.querySelector('.source__item') as HTMLElement | null;

            if (itemNameElement && itemElement) {
                itemNameElement.textContent = item.name;
                itemElement.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement | null;
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
            this.addClickHandlers();
        } else {
            console.error('Sources not found.');
        }
    }
    private addClickHandlers(): void {
        const items = document.querySelectorAll('.source__item');
        items.forEach((item) => {
            item.addEventListener('click', function (this: HTMLElement) {
                items.forEach((el) => el.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
}

export default Sources;

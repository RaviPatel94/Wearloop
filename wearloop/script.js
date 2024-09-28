
    // Function to dynamically create the items and add them to the menu
async function loadItems() {
    try {
        // Fetch the items.json file
        const response = await fetch('./items.json');
        const items = await response.json();

        const menu = document.getElementById('menu');
        items.forEach(item => {
            const itemHTML = `
                <div class="itemdispay">
                    <img class="itemthumbnail" src="${item.img}" alt="${item.title}" />
                    <div>
                        <div class="itemtitle">${item.title}</div>
                        <div class="revcost">
                            <div class="mcost">${item.price}</div>
                            <div class="addbtn">
                                <button id="${item.id}" onclick="addtokart(this.id)">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            menu.innerHTML += itemHTML;
        });
    } catch (error) {
        console.error('Error loading items:', error);
    }
}
window.onload = loadItems;

const kartlist=JSON.parse(localStorage.getItem("kart")) || [];

function addtokart(clickedid){
    console.log(clickedid)
    if (!kartlist.includes(clickedid)){
        kartlist.push(clickedid)
        console.log(kartlist)
        localStorage.setItem("kart", JSON.stringify(kartlist));
    }
}
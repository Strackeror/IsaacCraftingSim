import * as d3 from "d3";

export interface Item {
  name: string;
  quality: number;
  img: string;
  description: string;
}

export const items: { [id: number]: Item } = {};

export async function loadItems() {
  console.log("loading items");
  const xmlItems = await d3.xml("./items.xml");
  for (const item of xmlItems.querySelectorAll("passive,active,familiar")) {
    items[Number(item.getAttribute("id"))] = {
      name: String(item.getAttribute("name")),
      img: String(item.getAttribute("gfx")).toLowerCase(),
      quality: 0,
      description: String(item.getAttribute("description")),
    };
  }

  const xmlItemMetadata = await d3.xml("./items_metadata.xml");
  for (const item of xmlItemMetadata.querySelectorAll("item")) {
    const id = Number(item.getAttribute("id"));
    const quality = Number(item.getAttribute("quality"));
    if (id in items) {
      items[id].quality = quality;
    }
  }
}

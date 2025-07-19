import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [allItems, setAllItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterItem, setFilterItem] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Produce");

 function handleItemFormSubmit(newItem) {
  setAllItems([...allItems, newItem]);
}


  function handleName(event) {
    setItemName(event.target.value);
  }

  function handleSelect(event) {
    setCategory(event.target.value);
  }

  function handleFilter(event) {
    setFilterItem(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(filterItem.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm
        itemName={itemName}
        category={category}
        handleName={handleName}
        handleSelect={handleSelect}
        onItemFormSubmit={handleItemFormSubmit}
      />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleFilter}
        search={filterItem}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

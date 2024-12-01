"use client";

import { useState } from "react";

export default function Post() {
    // Declare vars to be used
    let [title, setTitle] = useState('');
    let [ingredients, setIngredients] = useState([{id: 0, content: ''}]);
    let nextIngredientId: number = 1;
    let [instructions, setInstructions] = useState([{id: 0, content: ''}]);
    let nextInstructionId: number = 1;
    let [tags, setTags] = useState([{id: 0, content: ''}]);
    let nextTagId: number = 1;

    // Declare the interface for the ingredient
    interface ArrayEntryStruct {
        id: number,
        content: string,
    }

    // Function to update entry in state array
    function updateStateArray(array: ArrayEntryStruct[], element: ArrayEntryStruct): ArrayEntryStruct[] {
        return array.map((oldElement: ArrayEntryStruct) => {
            if(element.id == oldElement.id) {
                return element;
            } else {
                return oldElement;
            }
        });
    }

    return (
        <>
            <main>
                <form>
                    {/* Recipe Title/Name */}
                    <input value={title} onChange={(elem) => setTitle(elem.target.value)} type="text" name="title" id="title" placeholder="Name of Recipe" required />
                    <hr />
                    {/* Ingredients */}
                    {ingredients.map((ingredient: ArrayEntryStruct, index: number) => (
                        <input value={ingredient.content} onChange={(elem) => {
                            const nextIngredients: ArrayEntryStruct[] = updateStateArray(ingredients, {id: ingredient.id, content: elem.target.value});
                            setIngredients(nextIngredients);
                        }} type="text" name={`ingredient${index}`} id={`ingredient${index}`} placeholder="Ingredient" key={index} required />
                    ))}
                    <button type="button" name="addingredient" id="addingredient" onClick={() => {
                        const nextIngredients: ArrayEntryStruct[] = [...ingredients, {id: nextIngredientId, content: ''}];
                        nextIngredientId++;
                        setIngredients(nextIngredients);
                    }}>Add Ingredient</button>
                    <hr />
                    {/* Instructions */}
                    {instructions.map((instruction: ArrayEntryStruct, index: number) => (
                        <input value={instruction.content} onChange={(elem) => {
                            const nextInstructions: ArrayEntryStruct[] = updateStateArray(instructions, {id: instruction.id, content: elem.target.value});
                            setInstructions(nextInstructions);
                        }} type="text" name={`step${index}`} id={`step${index}`} placeholder={`Step ${index + 1}`} key={index} required />
                    ))}
                    <button type="button" name="addstep" id="addstep" onClick={() => {
                        const nextInstructions: ArrayEntryStruct[] = [...instructions, {id: nextInstructionId, content: ''}];
                        nextInstructionId++;
                        setInstructions(nextInstructions);
                    }}>Add Step</button>
                    <hr />
                    {/* Tags */}
                    {tags.map((tag: ArrayEntryStruct, index: number) => (
                        <input value={tag.content} onChange={(elem) => {
                            const nextTags: ArrayEntryStruct[] = updateStateArray(tags, {id: tag.id, content: elem.target.value});
                            setTags(nextTags);
                        }} type="text" name={`tag${index}`} id={`tag${index}`} placeholder="Tag" key={index} required />
                    ))}
                    <button type="button" name="addtag" id="addtag" onClick={() => {
                        const nextTags: ArrayEntryStruct[] = [...tags, {id: nextTagId, content: ''}];
                        nextTagId++;
                        setTags(nextTags);
                    }}>Add Step</button>
                    <hr />
                    {/* Submit */}
                    <button type="submit" name="submit" id="submit">Submit</button>
                </form>
            </main>
        </>
    );
}
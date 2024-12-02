"use client";

import { useState, FormEvent } from "react";

export default function PostRecipeForm(props: { postRecipe: (title: string, ingredients: string[], instructions: string[], tags: string[]) => Promise<boolean> }) {
    // Declare vars to be used
    let [title, setTitle] = useState('');
    let [ingredients, setIngredients] = useState([{id: 0, content: ''}]);
    let [nextIngredientId, setNextIngredientId] = useState(1);
    let [instructions, setInstructions] = useState([{id: 0, content: ''}]);
    let [nextInstructionId, setNextInstructionId] = useState(1);
    let [tags, setTags] = useState([{id: 0, content: ''}]);
    let [nextTagId, setNextTagId] = useState(1);
    let [submissionStatus, setSubmissionStatus] = useState(0);

    // submissionStatus == 0 when not submitted
    // submissionStatus == 1 when failed
    // submissionStatus == 2 when succeeded

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

    // Function to remove entry from state array
    function removeStateArrayEntry(array: ArrayEntryStruct[], elementId: number): ArrayEntryStruct[] {
        return array.filter((element: ArrayEntryStruct) => element.id != elementId);
    }

    // Function to handle form submission
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let result: boolean = await props.postRecipe(title, ingredients.map((elem: ArrayEntryStruct) => {return elem.content;}), instructions.map((elem: ArrayEntryStruct) => {return elem.content;}), tags.map((elem: ArrayEntryStruct) => {return elem.content;}));
        if(!result) {
            setSubmissionStatus(1);
        } else {
            setTitle('');
            setIngredients([{id: 0, content: ''}]);
            setNextIngredientId(1);
            setInstructions([{id: 0, content: ''}]);
            setNextInstructionId(1);
            setTags([{id: 0, content: ''}]);
            setNextTagId(1);
            setSubmissionStatus(2);
        }
    }

    return (
        <>
            {submissionStatus == 1 && <div id="submissionfaileddiv" className="bg-red-500 dark:bg-red-300 p-2 rounded-2xl">
                <h2 className="text-slate-800 text-2xl font-semibold text-center">Submission failed. Please try again later.</h2>
            </div>}
            {submissionStatus == 2 && <div id="submissionsucceededdiv" className="bg-green-500 dark:bg-green-300 p-2 rounded-2xl">
                <h2 className="text-slate-800 text-2xl font-semibold text-center">Recipe posted!</h2>
                <p className="text-slate-800 text-lg font-normal text-center">Click here to see it!</p>
            </div>}
            {submissionStatus != 0 && <br />}
            <form onSubmit={handleSubmit}>
                <div id="titlediv" className="flex flex-row">
                    <h4 className="text-2xl font-semibold mr-5">Recipe Name:</h4>
                    <input className="rounded-xl py-1 px-2 text-slate-300 dark:text-slate-800 bg-slate-800 dark:bg-slate-300" value={title} onChange={(elem) => setTitle(elem.target.value)} type="text" name="title" id="title" placeholder="Name of Recipe" required />
                </div>
                <br />
                <div id="ingredientsdiv" className="flex flex-col">
                    <h4 className="text-2xl font-semibold mr-5">Ingredients:</h4>
                    <ul className="list-disc list-inside">
                        {ingredients.map((ingredient: ArrayEntryStruct, index: number) => (
                            <li className="my-2" key={index}>
                                <input className="rounded-xl py-1 px-2 text-slate-300 dark:text-slate-800 bg-slate-800 dark:bg-slate-300" value={ingredient.content} onChange={(elem) => {
                                    const nextIngredients: ArrayEntryStruct[] = updateStateArray(ingredients, {id: ingredient.id, content: elem.target.value});
                                    setIngredients(nextIngredients);
                                }} type="text" name={`ingredient${index}`} id={`ingredient${index}`} placeholder="Ingredient" required />
                                {ingredients.length > 1 && <button type="button" className="mx-2 px-3 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 rounded-xl" name={`deleteingredient${ingredient.id}`} id={`deleteingredient${ingredient.id}`} onClick={() => {
                                    const nextIngredients: ArrayEntryStruct[] = removeStateArrayEntry(ingredients, ingredient.id);
                                    setIngredients(nextIngredients);
                                }}>x</button>}
                            </li>
                        ))}
                    </ul>
                    <button className="my-2 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 text-lg py-2 px-3 rounded-2xl" type="button" name="addingredient" id="addingredient" onClick={() => {
                        const nextIngredients: ArrayEntryStruct[] = [...ingredients, {id: nextIngredientId, content: ''}];
                        setNextIngredientId(nextIngredientId + 1);
                        setIngredients(nextIngredients);
                    }}>Add Ingredient?</button>
                </div>
                <br />
                <div id="instructionsdiv" className="flex flex-col">
                    <h4 className="text-2xl font-semibold mr-5">Instructions:</h4>
                    <ul className="list-decimal list-inside">
                        {instructions.map((instruction: ArrayEntryStruct, index: number) => (
                            <li className="my-2" key={index}>
                                <input className="rounded-xl py-1 px-2 text-slate-300 dark:text-slate-800 bg-slate-800 dark:bg-slate-300" value={instruction.content} onChange={(elem) => {
                                    const nextInstructions: ArrayEntryStruct[] = updateStateArray(instructions, {id: instruction.id, content: elem.target.value});
                                    setInstructions(nextInstructions);
                                }} type="text" name={`step${index}`} id={`step${index}`} placeholder={`Step ${index + 1}`} required />
                                {instructions.length > 1 && <button type="button" className="mx-2 px-3 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 rounded-xl" name={`deletestep${instruction.id}`} id={`deletestep${instruction.id}`} onClick={() => {
                                    const nextInstructions: ArrayEntryStruct[] = removeStateArrayEntry(instructions, instruction.id);
                                    setInstructions(nextInstructions);
                                }}>x</button>}
                            </li>
                        ))}
                    </ul>
                    <button className="my-2 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 text-lg py-2 px-3 rounded-2xl" type="button" name="addstep" id="addstep" onClick={() => {
                        const nextInstructions: ArrayEntryStruct[] = [...instructions, {id: nextInstructionId, content: ''}];
                        setNextInstructionId(nextInstructionId + 1);
                        setInstructions(nextInstructions);
                    }}>Add Step</button>
                </div>
                <br />
                <div id="tagsdiv" className="flex flex-col">
                    <h4 className="text-2xl font-semibold mr-5">Tags:</h4>
                    <ul className="list-disc list-inside">
                        {tags.map((tag: ArrayEntryStruct, index: number) => (
                            <li className="my-2" key={index}>
                                <input className="rounded-xl py-1 px-2 text-slate-300 dark:text-slate-800 bg-slate-800 dark:bg-slate-300" value={tag.content} onChange={(elem) => {
                                    const nextTags: ArrayEntryStruct[] = updateStateArray(tags, {id: tag.id, content: elem.target.value});
                                    setTags(nextTags);
                                }} type="text" name={`tag${index}`} id={`tag${index}`} placeholder="Tag" required />
                                {tags.length > 1 && <button type="button" className="mx-2 px-3 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 rounded-xl" name={`deletetag${tag.id}`} id={`deletetag${tag.id}`} onClick={() => {
                                    const nextTags: ArrayEntryStruct[] = removeStateArrayEntry(tags, tag.id);
                                    setTags(nextTags);
                                }}>x</button>}
                            </li>
                        ))}
                        <button className="my-2 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 text-lg py-2 px-3 rounded-2xl" type="button" name="addtag" id="addtag" onClick={() => {
                            const nextTags: ArrayEntryStruct[] = [...tags, {id: nextTagId, content: ''}];
                            setNextTagId(nextTagId + 1);
                            setTags(nextTags);
                        }}>Add Step</button>
                    </ul>
                </div>
                <br />
                <button className="my-2 bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 text-lg py-2 px-3 rounded-2xl" type="submit" name="submit" id="submit">Submit</button>
            </form>
        </>
    );
}
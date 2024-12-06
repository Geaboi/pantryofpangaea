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
    {submissionStatus == 1 && (
      <div
        id="submissionfaileddiv"
        className="bg-red-500 dark:bg-red-300 p-4 rounded-lg mb-4 text-white"
      >
        <h2 className="text-white text-2xl font-semibold text-center">
          Submission failed. Please try again later.
        </h2>
      </div>
    )}
    {submissionStatus == 2 && (
      <div
        id="submissionsucceededdiv"
        className="bg-green-500 dark:bg-green-300 p-4 rounded-lg mb-4 text-white"
      >
        <h2 className="text-white text-2xl font-semibold text-center">
          Recipe posted!
        </h2>
        <p className="text-white text-lg font-normal text-center">
          Click here to see it!
        </p>
      </div>
    )}
    {submissionStatus != 0 && <br />}
    <form
      onSubmit={handleSubmit}
    >
      <div id="titlediv" className="mb-6">
        <label
          htmlFor="title"
          className="block text-xl font-semibold text-gray-800 mb-2"
        >
          Recipe Name:
        </label>
        <input
          className="w-full rounded-md py-2 px-4 text-gray-800 bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-orange-500"
          value={title}
          onChange={(elem) => setTitle(elem.target.value)}
          type="text"
          name="title"
          id="title"
          placeholder="Name of Recipe"
          required
        />
      </div>

      <div id="ingredientsdiv" className="mb-6">
        <label
          htmlFor="ingredients"
          className="block text-xl font-semibold text-gray-800 mb-2"
        >
          Ingredients:
        </label>
        <ul className="list-disc list-inside space-y-2">
          {ingredients.map((ingredient: ArrayEntryStruct, index: number) => (
            <li className="flex items-center space-x-4" key={index}>
              <input
                className="w-full rounded-md py-2 px-4 text-gray-800 bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-orange-500"
                value={ingredient.content}
                onChange={(elem) => {
                  const nextIngredients: ArrayEntryStruct[] = updateStateArray(
                    ingredients,
                    { id: ingredient.id, content: elem.target.value }
                  );
                  setIngredients(nextIngredients);
                }}
                type="text"
                name={`ingredient${index}`}
                id={`ingredient${index}`}
                placeholder="Ingredient"
                required
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => {
                    const nextIngredients: ArrayEntryStruct[] =
                      removeStateArrayEntry(ingredients, ingredient.id);
                    setIngredients(nextIngredients);
                  }}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          type="button"
          onClick={() => {
            const nextIngredients: ArrayEntryStruct[] = [
              ...ingredients,
              { id: nextIngredientId, content: "" },
            ];
            setNextIngredientId(nextIngredientId + 1);
            setIngredients(nextIngredients);
          }}
        >
          Add Ingredient
        </button>
      </div>

      <div id="instructionsdiv" className="mb-6">
        <label
          htmlFor="instructions"
          className="block text-xl font-semibold text-gray-800 mb-2"
        >
          Instructions:
        </label>
        <ul className="list-decimal list-inside space-y-2">
          {instructions.map((instruction: ArrayEntryStruct, index: number) => (
            <li className="flex items-center space-x-4" key={index}>
              <input
                className="w-full rounded-md py-2 px-4 text-gray-800 bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-orange-500"
                value={instruction.content}
                onChange={(elem) => {
                  const nextInstructions: ArrayEntryStruct[] = updateStateArray(
                    instructions,
                    { id: instruction.id, content: elem.target.value }
                  );
                  setInstructions(nextInstructions);
                }}
                type="text"
                name={`instruction${index}`}
                id={`instruction${index}`}
                placeholder={`Step ${index + 1}`}
                required
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => {
                    const nextInstructions: ArrayEntryStruct[] =
                      removeStateArrayEntry(instructions, instruction.id);
                    setInstructions(nextInstructions);
                  }}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          type="button"
          onClick={() => {
            const nextInstructions: ArrayEntryStruct[] = [
              ...instructions,
              { id: nextInstructionId, content: "" },
            ];
            setNextInstructionId(nextInstructionId + 1);
            setInstructions(nextInstructions);
          }}
        >
          Add Step
        </button>
      </div>

      <div id="tagsdiv" className="mb-6">
        <label
          htmlFor="tags"
          className="block text-xl font-semibold text-gray-800 mb-2"
        >
          Tags:
        </label>
        <ul className="list-disc list-inside space-y-2">
          {tags.map((tag: ArrayEntryStruct, index: number) => (
            <li className="flex items-center space-x-4" key={index}>
              <input
                className="w-full rounded-md py-2 px-4 text-gray-800 bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-orange-500"
                value={tag.content}
                onChange={(elem) => {
                  const nextTags: ArrayEntryStruct[] = updateStateArray(tags, {
                    id: tag.id,
                    content: elem.target.value,
                  });
                  setTags(nextTags);
                }}
                type="text"
                name={`tag${index}`}
                id={`tag${index}`}
                placeholder="Tag"
                required
              />
              {tags.length > 1 && (
                <button
                  type="button"
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => {
                    const nextTags: ArrayEntryStruct[] = removeStateArrayEntry(
                      tags,
                      tag.id
                    );
                    setTags(nextTags);
                  }}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          type="button"
          onClick={() => {
            const nextTags: ArrayEntryStruct[] = [
              ...tags,
              { id: nextTagId, content: "" },
            ];
            setNextTagId(nextTagId + 1);
            setTags(nextTags);
          }}
        >
          Add Tag
        </button>
      </div>

      <button
        className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-lg font-bold"
        type="submit"
      >
        Submit
      </button>
    </form>
  </>
);

}
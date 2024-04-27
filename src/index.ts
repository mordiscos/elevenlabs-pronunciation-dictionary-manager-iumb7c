import * as fs from "fs";
import { ElevenLabsClient, PronunciationDictionary } from "elevenlabs";

// Initialize ElevenLabs client with your API key
const elevenlabs = new ElevenLabsClient({
    apiKey: "YOUR_API_KEY"
});

// Step 1: Example PLS file content is shown in the plan above.

// Step 2: Add the PLS file to a pronunciation dictionary
async function createPronunciationDictionary() {
    const fileStream = fs.createReadStream("/path/to/your/pls/file.pls");
    const response = await elevenlabs.pronunciationDictionary.create({
        file: fileStream,
        name: "Tomato Pronunciations",
        requestOptions: {
            timeoutInSeconds: 30
        }
    });
    console.log('Pronunciation Dictionary Created:', response);
    return response.id; // Assuming the response object has an 'id' field
}

// Step 3: View that Pronunciation Dictionary
async function getPronunciationDictionary(pronunciationDictionaryId: string) {
    const response = await elevenlabs.pronunciationDictionary.get(pronunciationDictionaryId);
    console.log('Pronunciation Dictionary Details:', response);
}

// Step 4: Remove the Pronunciation Dictionary
async function deletePronunciationDictionary(pronunciationDictionaryId: string) {
    const response = await elevenlabs.pronunciationDictionary.delete(pronunciationDictionaryId);
    console.log('Pronunciation Dictionary Deleted:', response);
}

// Execute the script
async function execute() {
    try {
        const pronunciationDictionaryId = await createPronunciationDictionary();
        await getPronunciationDictionary(pronunciationDictionaryId);
        await deletePronunciationDictionary(pronunciationDictionaryId);
    } catch (error) {
        console.error('Error:', error);
    }
}

execute();

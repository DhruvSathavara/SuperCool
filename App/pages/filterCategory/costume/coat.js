import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";

const CoatCostume = () => {

    const [designStyle, setDesignStyle] = useState(designStyle || 'design style');
    const [coatType, setCoatType] = useState(coatType || 'coat type');
    const [coatColor, setCoatColor] = useState(coatColor || 'color');
    const [coatLength, setCoatLength] = useState(coatLength || 'coat length');
    const [collarType, setCollarType] = useState(collarType || 'collar type');
    const [sleeveLength, setSleeveLength] = useState(sleeveLength || 'sleeve length');


    // let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create a profile avatar based on this information:- make sure image style will be ${imageStyle}, gender:${gender}, hair style:${hairstyle},hair color:${hairColor}${gender == "Male" ? `,facial hair:${facialHair}` : ""},facial Expression:${facialExpression},eye color:${eyeColor},skin tone:${skinTone},clothing style:${clothingStyle},accessories:${accessories},body type:${bodyType},age:${age},ethnicity:${ethnicity}, Remember to infuse the avatar with vitality and energy`
    // console.log(detailPrompt);
    //   
    const generateText = async () => {

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: detailPrompt,
                    max_tokens: 700,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data.choices[0].text);
            //   setText(response.data.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const designStyleOptionsText = [
        {
            id: 1,
            text: 'Modern',
        },
        {
            id: 2,
            text: 'Futuristic',
        },
        {
            id: 3,
            text: 'Steampunk',
        },
        {
            id: 4,
            text: 'Ancient',
        },
        {
            id: 5,
            text: 'Robotic',
        },
        {
            id: 6,
            text: 'Fantasy',
        },
    ];

    const coatTypeOptionsText = [
        {
            id: 1,
            text: 'Trench coat',
        },
        {
            id: 2,
            text: 'Pea coat',
        },
        {
            id: 3,
            text: 'Overcoat',
        },
        {
            id: 4,
            text: 'Duster coat',
        },
        {
            id: 5,
            text: 'Cape coat',
        },
        {
            id: 6,
            text: 'Tailcoat',
        },
    ];
    const coatColorOptionsText = [
        {
            id: 1,
            text: 'Red',
        },
        {
            id: 2,
            text: 'Blue',
        },
        {
            id: 3,
            text: 'Black',
        },
        {
            id: 4,
            text: 'Grey',
        },
        {
            id: 5,
            text: 'Pink',
        },
    ];
    const coatLengthOptionsText = [
        {
            id: 1,
            text: 'full length',
        },
        {
            id: 2,
            text: 'knee length',
        },
        {
            id: 3,
            text: 'short length',
        },

    ];

    const collarTypeOptionsText = [
        {
            id: 1,
            text: 'Notched collar',
        },
        {
            id: 2,
            text: 'Shawl collar',
        },
        {
            id: 3,
            text: 'Stand collar',
        },
        {
            id: 4,
            text: 'Mandarin collar',
        },

    ];

    const sleeveLengthOptionsText = [
        {
            id: 1,
            text: 'Full sleeves',
        },
        {
            id: 2,
            text: 'Three-quarter sleeves',
        },
        {
            id: 3,
            text: 'Short sleeves',
        },
    ];



    return (
        <>

            <StandardDropdown
                dropdownItemText={designStyleOptionsText}
                state={designStyle}
                setState={setDesignStyle}
            />

            <StandardDropdown
                dropdownItemText={coatTypeOptionsText}
                state={coatType}
                setState={setCoatType}
            />

            <StandardDropdown
                dropdownItemText={coatColorOptionsText}
                state={coatColor}
                setState={setCoatColor}
            />

            <StandardDropdown
                dropdownItemText={coatLengthOptionsText}
                state={coatLength}
                setState={setCoatLength}
            />

            <StandardDropdown
                dropdownItemText={collarTypeOptionsText}
                state={collarType}
                setState={setCollarType}
            />

            <StandardDropdown
                dropdownItemText={sleeveLengthOptionsText}
                state={sleeveLength}
                setState={setSleeveLength}
            />


            <Button onClick={generateText}>Submit</Button>
        </>
    )
}

export default CoatCostume;
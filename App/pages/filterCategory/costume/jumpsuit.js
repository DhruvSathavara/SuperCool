import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";

const JumpsuitCostume = () => {

    const [designStyle, setDesignStyle] = useState(designStyle || 'design style');
    const [jumpsuitType, setJumpsuitType] = useState(jumpsuitType || 'jumpsuit type');
    const [closure, setClosure] = useState(closure || 'closure');
    const [jumpsuitColor, setjumpsuitColor] = useState(jumpsuitColor || 'color');



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
    ];

    const jumpsuitTypeOptionsText = [
        {
            id: 1,
            text: 'sleeveless',
        },
        {
            id: 2,
            text: 'Baggy',
        },
        {
            id: 3,
            text: 'Wide-leg',
        },
        {
            id: 4,
            text: 'short sleeves',
        },
        {
            id: 5,
            text: 'long sleeves',
        },
        {
            id: 6,
            text: 'Halter neck',
        },
       
    ];

    const jumpsuitColorOptionsText = [
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
    const jumpsuitClosureOptionsText = [
        {
            id: 1,
            text: 'zipper',
        },
        {
            id: 2,
            text: 'Buttons',
        },
        {
            id: 3,
            text: 'Snap buttons',
        },
        {
            id: 4,
            text: 'Tie-waist',
        },
        {
            id: 5,
            text: 'Elastic waist',
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
                dropdownItemText={jumpsuitTypeOptionsText}
                state={jumpsuitType}
                setState={setJumpsuitType}
            />

            <StandardDropdown
                dropdownItemText={jumpsuitColorOptionsText}
                state={jumpsuitColor}
                setState={setjumpsuitColor}
            />

            <StandardDropdown
                dropdownItemText={jumpsuitClosureOptionsText}
                state={closure}
                setState={setClosure}
            />

            <Button onClick={generateText}>Submit</Button>
        </>
    )
}

export default JumpsuitCostume;
import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";

const ProfileAvatarFeatures = () => {

    const [gender, setGender] = useState(gender || 'gender');
    // console.log('gender--', gender);
    const [hairstyle, setHairstyle] = useState(hairstyle || 'hair style');
    // console.log('h style--', hairstyle);
    const [hairColor, setHairColor] = useState(hairColor || 'hair color');
    // console.log('h color--', hairColor);

    const [facialHair, setFacialHair] = useState(facialHair || 'facial hair');
    const [facialExpression, setFacialExpression] = useState(facialExpression || 'Expression');
    const [eyeColor, setEyeColor] = useState(eyeColor || 'eyes');
    const [skinTone, setSkinTone] = useState(skinTone || 'skin tone');
    const [clothingStyle, setClothingStyle] = useState(clothingStyle || 'clothing style');
    const [accessories, setAccessories] = useState(accessories || 'accessories');
    const [imageStyle, setImageStyle] = useState(imageStyle || 'image style');
    const [bodyType, setBodyType] = useState(bodyType || 'body type');
    const [age, setAge] = useState(age || 'age');
    const [ethnicity, setEthnicity] = useState(ethnicity || 'ethnicity');


    let promptData = {
        gender:gender,
        hairstyle:hairstyle,
        hairColor:hairColor,
        facialHair:facialHair,
        facialExpression:facialExpression,
        eyeColor:eyeColor,
        skinTone:skinTone,
        clothingStyle:clothingStyle,
        accessories:accessories,
        imageStyle:imageStyle,
        bodyType:bodyType,
        age:age,
        ethnicity:ethnicity   
    }

console.log(promptData);

    const genderOptionsText = [
        {
            id: 1,
            text: 'Male',
        },
        {
            id: 2,
            text: 'Female',
        },
        {
            id: 3,
            text: 'Non-binary',
        },
    ];
    const hairStyleOptionsText = [
        {
            id: 1,
            text: 'short',
        },
        {
            id: 2,
            text: 'long',
        },
        {
            id: 3,
            text: 'Curly',
        },
        {
            id: 4,
            text: 'Straight',
        },
        {
            id: 5,
            text: 'Wavy',
        },
        {
            id: 6,
            text: 'Braided',
        },
        {
            id: 7,
            text: 'Mohawk',
        }
    ];
    const hairColorOptionsText = [
        {
            id: 1,
            text: 'Blonde',
        },
        {
            id: 2,
            text: 'Brunette',
        },
        {
            id: 3,
            text: 'Black',
        },
        {
            id: 4,
            text: 'Red',
        },
        {
            id: 5,
            text: 'Grey',
        },
        {
            id: 6,
            text: 'Blue',
        },
        {
            id: 7,
            text: 'Pink',
        }
    ];
    const facialHairOptionsText = [
        {
            id: 1,
            text: 'Beard',
        },
        {
            id: 2,
            text: 'Mustache',
        },
        {
            id: 3,
            text: 'Clean-shaven',
        },
    ];
    const facialExpressionOptionsText = [
        {
            id: 1,
            text: 'Happy',
        },
        {
            id: 2,
            text: 'Sad',
        },
        {
            id: 3,
            text: 'Angry',
        },
        {
            id: 4,
            text: 'Surprised',
        },
        {
            id: 5,
            text: 'Neutral',
        },
        {
            id: 6,
            text: 'Smiling',
        },
    ];
    const eyeColorOptionsText = [
        {
            id: 1,
            text: 'Blue',
        },
        {
            id: 2,
            text: 'Brown',
        },
        {
            id: 3,
            text: 'Green',
        },
        {
            id: 4,
            text: 'Hazel',
        },
        {
            id: 5,
            text: 'Grey',
        },
    ];
    const skinToneOptionsText = [
        {
            id: 1,
            text: 'Light',
        },
        {
            id: 2,
            text: 'Medium',
        },
        {
            id: 3,
            text: 'Dark',
        },
    ];
    const clothingStyleOptionsText = [
        {
            id: 1,
            text: 'Casual',
        },
        {
            id: 2,
            text: 'Sporty',
        },
        {
            id: 3,
            text: 'Retro',
        },
        {
            id: 4,
            text: 'Fantasy',
        },
        {
            id: 5,
            text: 'Sci-fi',
        },
    ];
    const accessoriesOptionsText = [
        {
            id: 1,
            text: 'Glasses',
        },
        {
            id: 2,
            text: 'Hats',
        },
        {
            id: 3,
            text: 'Headphone',
        },
        {
            id: 4,
            text: 'Necklaces',
        },
        {
            id: 5,
            text: 'Earrings',
        },
    ];
    const imageStyleOptionsText = [
        {
            id: 1,
            text: 'Clay Art Style',
        },
        {
            id: 2,
            text: 'Aesthetic Style',
        },
        {
            id: 3,
            text: 'Realistic Style',
        },
        {
            id: 4,
            text: 'Cartoonish Style',
        },
        {
            id: 5,
            text: 'Pixel Art Style',
        },
        {
            id: 6,
            text: 'Retro Style',
        },
        {
            id: 7,
            text: 'Pop Art Style',
        },
        {
            id: 8,
            text: 'Watercolor Style',
        },
        {
            id: 9,
            text: 'Minimalist Style',
        },
        {
            id: 10,
            text: 'Graffiti Style',
        },
        {
            id: 11,
            text: 'Anime Style',
        },
        {
            id: 12,
            text: 'Fantasy Style',
        },
    ];
    const bodyTypeOptionsText = [
        {
            id: 1,
            text: 'Slim',
        },
        {
            id: 2,
            text: 'Athletic',
        },
        {
            id: 3,
            text: 'Curvy',
        },
        {
            id: 4,
            text: 'Muscular',
        },
    ];
    const ageOptionsText = [
        {
            id: 1,
            text: 'Young',
        },
        {
            id: 2,
            text: 'Middle-aged',
        },
        {
            id: 3,
            text: 'Elderly',
        },
    ];
    const ethnicityOptionsText = [
        {
            id: 1,
            text: 'Asian',
        },
        {
            id: 2,
            text: 'African',
        },
        {
            id: 3,
            text: 'Caucasian',
        },
        {
            id: 4,
            text: 'Hispanic',
        },
    ];

    const genderOptions = ["Male", "Female", "Non-binary", "Other"];
    const hairstyleOptions = ["Short", "Medium", "Long", "Bald", "Curly", "Straight", "Wavy", "Braided", "Mohawk"];
    const hairColorOptions = ["Blonde", "Brunette", "Black", "Red", "Grey", "Blue", "Pink"];
    const facialHairOptions = ["Beard", "Mustache", "Goatee", "Clean-shaven"];
    const facialExpressionOptions = ["Happy", "Sad", "Angry", "Surprised", "Neutral", "Smiling"];
    const eyeColorOptions = ["Blue", "Brown", "Green", "Hazel", "Grey"];
    const skinToneOptions = ["Light", "Medium", "Dark"];
    const clothingStyleOptions = ["Casual", "Formal", "Sporty", "Retro", "Fantasy", "Sci-fi"];
    const accessoriesOptions = ["Glasses", "Hats", "Earrings", "Necklaces", "Headphone"];
    const imageStyleOptions = ["Clay Art Style", "Aesthetic Style", "Realistic Style", "Cartoonish Style", "Pixel Art Style", "Retro Style", "Pop Art Style", "Watercolor Style", "Minimalist Style", "Graffiti Style", "Anime Style", "Realistic Style", "Fantasy Style"];
    const bodyTypeOptions = ["Slim", "Athletic", "Curvy", "Muscular"];
    const ageOptions = ["Young", "Middle-aged", "Elderly"];
    const ethnicityOptions = ["Caucasian", "African", "Asian", "Hispanic", "Other"];

    return (
        <>
            <StandardDropdown
                dropdownItemText={genderOptionsText}
                state={gender}
                setState={setGender}
            />

            <StandardDropdown
                dropdownItemText={hairStyleOptionsText}
                state={hairstyle}
                setState={setHairstyle}
            />

            <StandardDropdown
                dropdownItemText={hairColorOptionsText}
                state={hairColor}
                setState={setHairColor}
            />

            {gender == "Male" ?
                <StandardDropdown
                    dropdownItemText={facialHairOptionsText}
                    state={facialHair}
                    setState={setFacialHair}
                />
                : ""}

            <StandardDropdown
                dropdownItemText={facialExpressionOptionsText}
                state={facialExpression}
                setState={setFacialExpression}
            />
            <StandardDropdown
                dropdownItemText={eyeColorOptionsText}
                state={eyeColor}
                setState={setEyeColor}
            />


            <StandardDropdown
                dropdownItemText={skinToneOptionsText}
                state={skinTone}
                setState={setSkinTone}
            />

            <StandardDropdown
                dropdownItemText={clothingStyleOptionsText}
                state={clothingStyle}
                setState={setClothingStyle}
            />

            <StandardDropdown
                dropdownItemText={accessoriesOptionsText}
                state={accessories}
                setState={setAccessories}
            />

            <StandardDropdown
                dropdownItemText={imageStyleOptionsText}
                state={imageStyle}
                setState={setImageStyle}
            />

            <StandardDropdown
                dropdownItemText={bodyTypeOptionsText}
                state={bodyType}
                setState={setBodyType}
            />

            <StandardDropdown
                dropdownItemText={ageOptionsText}
                state={age}
                setState={setAge}
            />
            
             <StandardDropdown
                dropdownItemText={ethnicityOptionsText}
                state={ethnicity}
                setState={setEthnicity}
            />
        </>
    )
}

export default ProfileAvatarFeatures;
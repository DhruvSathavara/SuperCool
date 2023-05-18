import React, { useEffect, useRef, useState } from "react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import { Configuration, OpenAIApi } from "openai";
import { SUPER_COOL_NFT_CONTRACT, abi } from "../../constant/constant";
import { ethers } from "ethers";
import { SupercoolAuthContext } from "../../context/supercoolContext";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import ImageModal from "../modal/modal";
const Create = () => {
  const superCoolContext = React.useContext(SupercoolAuthContext);
  const { uploadOnIpfs, handleImgUpload, loading, setLoading, GenerateNum, prompt, setPrompt, genRanImgLoding, getAllNfts } = superCoolContext;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [chain, setChain] = useState("Ethereum");
  const [rendersellNFT, setrendersellNFT] = useState(false)
  const [imageUrl, setImageUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [writePrompt, setWritePrompt] = useState("");

  const imgRef = useRef();
  const [placeholder, setPlaceholder] = useState(
    "Search a lion with Paint Brushes painting the mona lisa painting..."
  );
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  console.log('the chosen one', selectedImage);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted && imageUrl) {
      imgRef.current = imageUrl;
      console.log('imgRef==', imgRef);
    }
  }, [imageUrl, isMounted]);

  const configuration = new Configuration({
    apiKey: process.env.apiKey,
  });
  const openai = new OpenAIApi(configuration);
console.log(process.env.apiKey,'apikey');


  //   const createCompletion = async () => {
  //     console.log(prompt);

  //   const completion = await openai.createCompletion({
  //     model: "text-davinci-003", 
  //     prompt: prompt,
  //     max_tokens: 2048,
  //   });
  // console.log(completion.data.choices[0].text);
  //   }





  const generateImage = async () => {
    setGenerateLoading(true);
    setPlaceholder(`Search ${prompt}...`);
    try {
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      // setPrompt(null);
      console.log(res);

      let arr = [];
      for (let i = 0; i < res.data.data.length; i++) {
        const img_url = res.data.data[i].url;
        console.log('img_url', img_url);
        const response = await axios.get(img_url,
          // `https://cors-anywhere.herokuapp.com/${img_url}`
          { responseType: 'arraybuffer' })
          console.log(response,'response');
        const arrayBuffer = response.data;
        const ipfsUrl = await handleImgUpload(arrayBuffer);
        console.log(ipfsUrl,'ipfsUrl');
        arr.push(ipfsUrl);
      }
      console.log(arr);
      setImages(arr);
      setGenerateLoading(false);

    } catch (error) {
      console.error(`Error generating image: ${error}`);
    }
    console.log(images);
  };
  const mintNft = async (_price, _metadataurl) => {
    try {
      const tx = await contract.mintNFT(_price, _metadataurl);
      await tx.wait();
    } catch (e) {
      console.error("Failed to mint NFT: " + e.message);
    }
    await getAllNfts()
    setMintLoading(false);
    // setPrompt(null);
    setImages([]);
    setTitle('');
    setDescription('');
    setPrice('');
    setrendersellNFT(false);
  };

  let provider;
  let signer;
  if (typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }

  const contract = new ethers.Contract(
    SUPER_COOL_NFT_CONTRACT,
    abi,
    signer
  );

  const nftData = {
    title: title,
    description: description,
    price: price,
    chain: chain,
    nftfile: selectedImage
  }
  const createNft = async () => {
    setMintLoading(true);
    let metadataurl = await uploadOnIpfs(nftData);
    mintNft(ethers.utils.parseUnits(price?.toString(), "ether"), metadataurl);
  }


  const getCategory = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      // prompt: "Decide whether a Tweet's sentiment is positive, neutral, or negative.\n\nTweet: \"I did not like the new Batman movie!\"\nSentiment:",
      prompt: "Decide whether a prompt's potential category should be Collectibles, Music, Gaming, Photography, Profile Avatar.\n\nPrompt: \"Create A Muchine Gun Weapon For Sniper Shoot Game\"\category:",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    console.log(response.data);
  }

  function RendersellNft() {
    if (rendersellNFT === true) {
      return (
        <div className="mx-auto max-w-[48.125rem]">
          <div className="mb-6">
            <label
              htmlFor="Title of NFT"
              className="font-display text-jacarta-700 mb-2 block dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="item-name"
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
              placeholder="Item name"
              required
              onChange={(e) => setTitle(e.target.value)}

            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="item-description"
              className="font-display text-jacarta-700 mb-2 block dark:text-white"
            >
              Description
            </label>
            <p className="dark:text-jacarta-300 text-2xs mb-3">
              The description will be included on the {"item's"} detail page
              underneath its image. Markdown syntax is supported.
            </p>
            <textarea
              id="item-description"
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
              rows="4"
              required
              placeholder="Provide a detailed description of your item."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="Price of NFT"
              className="font-display text-jacarta-700 mb-2 block dark:text-white"
            >
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="item-name"
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
              placeholder="Item name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="item-supply"
              className="font-display text-jacarta-700 mb-2 block dark:text-white"
            >
              Blockchain
            </label>

            <div className="dropdown relative mb-4 cursor-pointer ">
            </div>
          </div>

          <div className="create-btn">
            {
              mintLoading ? <CircularProgress /> :
                <button
                  onClick={() => createNft()}
                  className="bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                >
                  Create
                </button>
            }

          </div>
        </div>
      );
    } else {
      "nothing..."
    }
  }
  function handleSelectedImg(url) {
    setrendersellNFT(false);
    setSelectedImage(url);
    setModalOpen(true);
  }

  return (
    <div>
      <Meta title="SuperCool" />
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Let your creativity shine and give us a clear picture with your words
          </h1>

          <div className="mx-auto max-w-[48.125rem]">

            <div className="mb-6">
              <p className="dark:text-jacarta-300 text-4xs mb-3">
                We're excited to bring your NFT to life, but we need your input. Please provide us with a brief description of what you want it to look like. Or
                <span>
                  <a
                    className="hover:text-accent dark:hover:text-white text-jacarta-700 font-bold font-display mb-6 text-center text-md dark:text-white md:text-left lg:text-md xl:text-md animate-gradient"
                    style={{ cursor: "pointer" }} onClick={GenerateNum}
                  > {
                      genRanImgLoding ?
                        "generating random prompt..." : "generate random image."

                    }  </a>
                </span>
              </p>

              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                value={prompt}
                id="item-description"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows="6"
                required
              >
              </textarea>

              <div className="generate-btn">
                {generateLoading ?
                  <CircularProgress />
                  :
                  <button
                    className="bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all  "
                    style={{ marginBottom: "15px" }}
                    onClick={generateImage}
                  >
                    Generate
                  </button>
                }
              </div>
              <br />

              {
                images.length > 0 ?
                  <>
                    <div className="row main-row">
                      {images && images.map((url) => (
                        <div
                          className="col-lg-4 mb-4 mb-lg-0"
                          onClick={() => handleSelectedImg(url)}
                        >
                          <div
                            className="bg-image hover-overlay ripple shadow-1-strong rounded col-4"
                            data-ripple-color="light"
                          >
                            <div className="img-nft">
                              <img
                                src={url}
                              />
                            </div>
                            <div className="radio-img">
                              <input
                                type="radio"
                                id="huey"
                                name="drone"
                                value="huey"
                                checked={url == selectedImage}
                                className="mt-3"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                    <div>
                      <p style={{ textAlign: "center" }} className="dark:text-jacarta-300 text-4xs mb-3"
                      >Select the image you wish to mint.</p>
                    </div>
                  </>
                  : ""
              }

            </div>

            {modalOpen &&
              <div className="img-overlay">
                <ImageModal setModalOpen={setModalOpen}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  createNft={createNft}
                  setrendersellNFT={setrendersellNFT}
                />
              </div>
            }

          </div>
          {RendersellNft()}
        </div >
      </section >
    </div >
  );
};

export default Create;

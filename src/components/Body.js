import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import image1 from '../images/illustration-working.svg';
import BrandRecon from '../images/icon-brand-recognition.svg';
import detailedRec from '../images/icon-detailed-records.svg';
import fullyCustom from '../images/icon-fully-customizable.svg'

function Body() {

    const [val, setVal] = useState([])
    const [copy, setCopy] = useState(false)
    const [onLoading, setOnLoading] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [copyId, setCopyId] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const inputRef = useRef()
    const getShortCode = () => {
        const inputValue = inputRef.current.value
        if (inputValue === '') {
            setEmpty(true)
            setOnLoading(false)
        } else {
            setEmpty(false)
            setOnLoading(true)
        }
        Axios.get(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
            .then((response) => {
                console.log(response)
                if (!response.data.result.short_link2) {
                    throw new Error('oops invalid link')
                }
                const linkObj = {
                    id: response.data.result.code,
                    original: inputValue,
                    short: response.data.result.short_link2
                }

                setVal([...val, linkObj])
                setOnLoading(false)
                setLoaded(true)
            })
            .catch(handleErrors)
    }

    const handleErrors = (err) => {
        if (err.response || err.request) {
            setErrorMessage('oops! invalid link :(')
            setOnLoading(false)
            setError(true)
        }
    }
    const copyText = (newLink, id) => {
        navigator.clipboard.writeText(newLink)
        setCopy(true)
        setCopyId(id)
    }
    const copyStyle = (id) => {
        return {
            background: copy && copyId === id ? 'hsl(257, 27%, 26%)' : ""
        }
    }
    const handleSumbit = (e) => {
        e.preventDefault()
        getShortCode()
    }

    useEffect(() => {
        const shortLink = localStorage.getItem('link')
        if (!shortLink) return
        setVal(JSON.parse(shortLink))
    }, [])

    useEffect(() => {
        localStorage.setItem('link', JSON.stringify(val))
    });

    const getError = () => {
        return {
            border: empty && !loaded && error && '2px solid red',
        }
    }
    return (<div>
        <div>
            <div className='upper-side'>
                <div className="upper-side-text">
                    <h1>More than just shorter links</h1>
                    <p>Build your brand's recognition and get detailed insights on how your links are perfoming.</p>
                    <button className='get-started'>Get Started</button>
                </div>
                <div>
                    <img src={image1} alt="illustration" />
                </div>
            </div>
            <div className='form-shortener'>
                <form onSubmit={handleSumbit}>
                    <input style={getError()} name="" type="text" placeholder="Shorten a link here..." ref={inputRef} />
                    <button type='submit'>Shorten it!</button>
                    {empty && <span className='empty'>please insert a link</span>}
                    {!empty && !loaded && error && <span className='empty'>{errorMessage}</span>}
                </form>
            </div>
            <div className='box-house'>
                {onLoading && <div className="loading"></div>}
                <div className='mapped-links'>
                    {val.map((link) => (<li key={link.id}>
                        <div className='the-links'>
                            <div>{link.original}</div>
                            <div className='short-link'>{link.short} <button style={copyStyle(link.id)} onClick={() => { copyText(link.short, link.id) }}>{copy && link.id === copyId ? 'copied!' : 'copy'}</button></div>
                        </div>
                    </li>))}
                </div>
                <div className='writings'>
                    <h1>Advanced Statistics</h1>
                    <p>Track how your links are performing across the web with our advanced statistcs dashboard</p>
                </div>
                <div className='all-boxes'> <div className="empty-div"></div>

                    <div className='box1'>
                        <img src={BrandRecon} alt="Brand-recognition" />
                        <h3>Brand Recognition</h3>
                        <p>Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.</p>
                    </div>
                    <div className='box2'>
                        <img src={detailedRec} alt='Detailed-record' />
                        <h3>Detailed Records</h3>
                        <p>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>
                    </div>
                    <div className='box3'>
                        <img src={fullyCustom} alt='Fully-customizable' />
                        <h3>Fully Customizble</h3>
                        <p>Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.</p>
                    </div>
                </div>
            </div>
            <div className='last-part'>
                <h1>Boost your links today</h1>
                <button >Get Started</button>
            </div>
        </div>
    </div>);
}

export default Body;

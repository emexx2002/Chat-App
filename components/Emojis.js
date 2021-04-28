import Picker from 'emoji-picker-react';
import { useEffect, useState } from 'react'

function Emojis() {

    const isBrowser = typeof window !== "undefined";

    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };



    return isBrowser ? (
        <div>
            {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
                <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
        </div>
    ) : null;
}

export default Emojis

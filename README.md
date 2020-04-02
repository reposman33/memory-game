This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Memory game

Memory game with 8\*8 cards.
Guess the cards.
Created using React and Typescript

Traffic signs dloaded from [https://www.anwb.nl/vakantie/nederland/informatie/verkeersborden](https://www.anwb.nl/vakantie/nederland/informatie/verkeersborden)

### React notes

I used the callback pattern to enable the Board component to change state in components. For the Card component a method is passed in <Card /> as a property. In the useEffect of Card component that method is called with an object as a parameter. That object contains Card handlers to flip the card (show it upside down) and set the image (used with shuffling for example). So when the user clicks one of the shuffle buttons,before the loop all cards are flipped and inside each loop iteration the current card gets a random image assigned.

(c) march 2020- marcbakker.com

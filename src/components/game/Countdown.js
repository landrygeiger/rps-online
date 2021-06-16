import AnimatedNumber from "react-animated-numbers";

const Countdown = (props) => {

    return (
        <AnimatedNumber animateToNumber={props.count} />
    );
}

export default Countdown;
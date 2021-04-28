import {
    ChasingDots,
    Circle,
    CubeGrid,
    DoubleBounce,
    FadingCircle,
    FoldingCube,
    Pulse,
    RotatingPlane,
    ThreeBounce,
    WanderingCubes,
    Wave
} from 'better-react-spinkit'
function Loading() {
    return (
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div>
                <img src="/logo.png" alt=""
                    height={200}


                />
            </div>
            <ThreeBounce color="purple" size={40} />
        </center>

    )
}

export default Loading

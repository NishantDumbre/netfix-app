import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
    useMovieTrailer(movieId);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo)

    return (
        <div className="w-screen">
            <iframe
            className="w-screen h-auto aspect-video"
                width="560"
                height="315"
                src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1&controls=0&modestbranding=1&loop=1"}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
};

export default VideoBackground;

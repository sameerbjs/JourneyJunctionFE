const easeInOut = (
    start: number,
    distance: number,
    progress: number,
    duration: number
): number => {
    progress /= duration / 2;
    if (progress < 1) return (distance / 2) * progress * progress + start;
    progress--;
    return (-distance / 2) * (progress * (progress - 2) - 1) + start;
};

export const scrollToContent = (id: string, duration: number): void => {
    const section = document.getElementById(id);
    if (!section) return; // Check if section exists
    const sectionPosition = section.getBoundingClientRect().top;
    const start = window.scrollY;
    let startTime: number | null = null;

    const scroll = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        window.scrollTo(
            0,
            easeInOut(start, sectionPosition, elapsedTime, duration)
        );

        if (elapsedTime < duration) {
            requestAnimationFrame(scroll);
        }
    };

    requestAnimationFrame(scroll);
};

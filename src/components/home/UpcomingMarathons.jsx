import React from 'react';

const UpcomingMarathons = () => {
    const upcomingMarathons = [
        {
            id: 1,
            title: "Spring City Run",
            date: "2023-05-15",
            location: "New York",
        },
        {
            id: 2,
            title: "Spring City Run",
            date: "2023-05-15",
            location: "New York",
        },
        {
            id: 3,
            title: "Spring City Run",
            date: "2023-05-15",
            location: "New York",
        },]
    return (
        <section className="py-12 w-10/12 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Upcoming Marathons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingMarathons.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                        <h3 className="font-bold">{event.title}</h3>
                        <p>📍 {event.location}</p>
                        <p>🗓 {event.date}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UpcomingMarathons;
import React from 'react';

const QnA = () => {
    return (
        <section className="dark:bg-gray-100 dark:text-gray-800 w-10/12 mx-auto rounded-2xl">
            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">

                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                            How do I register for a marathon event?
                        </summary>
                        <div className="px-4 pb-4">
                            <p>
                                To register, you must first log in or create an account. Then, go to the “Marathons” page,
                                choose an event, and click “See Details.” If registration is open, you’ll see a “Register” button
                                which leads to the registration form.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                            Can I create my own marathon event?
                        </summary>
                        <div className="px-4 pb-4">
                            <p>
                                Yes! Once logged in, you can go to your Dashboard and select “Add Marathon.” Fill out the form with event details
                                such as title, date, location, and distance. Your marathon will then appear on the Marathons page.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                            What happens after I register for a marathon?
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                            <p>
                                Once you register, your registration will be stored in the database and shown under “My Apply List” on your dashboard.
                                You’ll also receive a confirmation message on the screen after submitting the form.
                            </p>
                            <p>
                                You can update or delete your registration anytime before the event using your dashboard.
                            </p>
                        </div>
                    </details>

                </div>
            </div>
        </section>
    );
};

export default QnA;
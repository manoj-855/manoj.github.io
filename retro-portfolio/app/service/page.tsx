import React from 'react';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Contact from '@/components/contact';


const ServicePage: React.FC = () => {
    return (
        <div id="service" className='mt-[30px]'>
            <Navbar />
            <Services />
            <Contact />
        </div>
    );
};

export default ServicePage;
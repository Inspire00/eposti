'use client';

import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <> {/* Replaced Layout with a Fragment */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">How Eposti Works</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg text-gray-700 leading-relaxed my-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Post A room 🏡</h2>
        <ol className=" mb-8 space-y-8">
          <li>
            <div className="mb-3">
                {/* Container for Image and Notes */}
              <div className="flex flex-grid items-center sm:flex-row sm:items-start mb-4">
                  {/* The image now takes up 1/3 of the container width and uses a custom height class (h-96) */}
                  <img 
                      src="/listing.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                  

              </div>
              
              {/* Notes for the Image */}
                  <p className="text-sm font-semibold italic text-black-500 mt-4 text-start text-left">
                    -Start the chat by typing Hi to greet the room assistant and start a conversation.
                  </p>
                  <p className="text-sm font-semibold italic text-black-500 mt-1">
                    -The Menu above will be diplayed. User has to choose number between 1-3. If the user is a landlord and has a vacant room/s user types 1. If user is a tenant and is looking for a room/s, user types 2. If user is looking for flats/house to rent, user types 3. The response is sent and you wait for the chatbot to reply. 
                  </p>

            </div>
            
            
          </li>
          <li>
            <div className="mb-5">

                  {/* Container for Image and Notes */}
              <div className="flex flex-grid items-center sm:flex-row sm:items-start mb-4">
                  {/* The image now takes up 1/3 of the container width and uses a custom height class (h-96) */}
                  <img 
                      src="/liting_2.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                  <img 
                      src="/listing_3.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                <img 
                      src="/listing_4.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                <img 
                      src="/listing_5.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />



                 
              </div>

               {/* Notes for the Image */}
                <p className="text-sm font-semibold italic text-black-500 mt-1">-When the landlord has typed 1, the listing flow starts. Landlord is prompted to enter his full name, next his/her whatsapp phone number,next the location of the room, next the monthly rental of the room,  </p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-next what utilities that are included or excluded in the rental amount, next does the place have secure parking?, next street address of the room, next flat or building name where the room is, next the month the room will be available, next additional notes about the room user wishes to communicate, </p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-next uplaod at least 1 image of the room and a maximum of 3 about the place, finally type done then uer will get a message to say room has been posted.  </p>


            </div>

                
          
            
          </li>
          
        </ol>

        <h2 className="text-2xl font-semibold text-black-900 mb-4 mt-20">For Room Seekers 👀</h2>
        <ol className="space-y-8">
          <li>
            <div className="mb-3">
                {/* Image Placeholder: Browse Listings */}
                    {/* Container for Image and Notes */}
              <div className="flex flex-grid items-center mb-4">
                  {/* The image now takes up 1/3 of the container width and uses a custom height class (h-96) */}
                  <img 
                      src="/room_search.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                  <img 
                      src="/room_search2.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                <img 
                      src="/room_search3.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                <img 
                      src="/room_search4.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />



                 
              </div>

                
                <p className="text-sm italic font-semibold text-black-500 mt-1">-Tenants type option 2 in the initial menu to start the search for room flow.</p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-If user opts for 1 that is by loaction, a numbered list of available rooms based on location is shown to the user. the user should then choose the desired location against the number.</p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-Then the available rooms information will be displayed to the user,images are shown at the end</p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-If user opts for 2 i.e searching for rooms by rent range, user is prompted to type the rent range minimum value first then maximum value last, then the latest rooms are retrieved and displayed to the user.</p>
                
            </div>
            
          </li>
          
        </ol>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-20">For Flat Seekers 👀</h2>
        <ol className="space-y-8">
          <li>
            <div className="mb-3">
                {/* Image Placeholder: Browse Listings */}

                  {/* Image Placeholder: Browse Listings */}
                    {/* Container for Image and Notes */}
              <div className="flex flex-grid items-center sm:flex-row sm:items-start mb-4">
                  {/* The image now takes up 1/3 of the container width and uses a custom height class (h-96) */}
                  
                  <img 
                      src="/flats_search.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                <img 
                      src="/flat_search2.png" 
                      alt="Chatbot welcome menu displaying options 1-3 for landlord, tenant, or flat seeker." 
                      // Increased the max height (h-96 is 24rem or 384px) and set a specific width (w-64) for a phone screen look
                      className="w-64 h-96 ml-5 object-contain rounded-md border border-gray-200 shadow-lg" 
                      // To manually control the height, you could use an inline style instead of h-96:
                      // style={{ height: '500px' }}
                  />

                 
              </div>


                <p className="text-sm italic font-semibold text-black-500 mt-1">-Users searching for Flats to let type option 3.</p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-Users have 4 options to search for flats, namely: 1.Location, 2. Rent/Month, 3. Flat Size, 4. Real Estate Company.</p>
                <p className="text-sm italic font-semibold text-black-500 mt-1">-If user presses either option a numbered list will be displayed to the user based on the search option.</p>
                
                
            </div>
            
          </li>
          
        </ol>

        <p className="mt-8">
          Our goal is to make room finding and listing as easy as chatting with a friend! If you have any questions, feel free to explore the About Us page or contact us on +27787594670
        </p>
      </div>
    </>
  );
}
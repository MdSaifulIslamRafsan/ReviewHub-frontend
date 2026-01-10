# ReviewHub

Welcome to the **ReviewHub** repository! This is the frontend application of the Product Review Portal, built using **Next.js** and styled with **Tailwind CSS**. The portal lets users create accounts, share product reviews, interact with posts, and access premium content. Admins can moderate content and manage premium reviews.

## Live Demo
Check out the live version of the site:
[Product Review Portal](https://reviewhub-eight.vercel.app/)


### Admin Credentials for Testing
- **Email**: admin@example.com
- **Password**: admin123

---

## Features
### User Features
- **Authentication**: Register and log in using email and password, with secure session management via JWT.
- **Write Reviews**: Create, edit, and delete reviews with a title, description, rating (1-5 stars), category, and optional purchase source or images.
- **Categorization**: Assign reviews to predefined categories such as Gadgets, Clothing, Books, etc.
- **Voting & Commenting**: Upvote/downvote reviews, remove votes, and comment/reply on reviews.
- **Premium Reviews**: 
  - Pay a one-time fee to view full premium review content and interact with it.
  - Payment integration via **SSLCommerz** or **ShurjoPay**.
- **Search & Filter**: Search reviews by keyword and filter by category, rating, date, and popularity.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- **Profile Management**: View payment history and manage user settings.

### Admin Features
- **Moderation**: Approve or unpublish user reviews and moderate comments.
- **Premium Review Management**: Create premium reviews, set pricing, and analyze payment data.
- **Dashboard**: View and manage all reviews and comments.


## Technology Stack
### Frontend
- **Next.js**: For server-side rendering and static site generation.
- **Tailwind CSS**: For utility-first styling.



### Deployment
- Hosted on **Vercel** for fast and reliable hosting.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/MdSaifulIslamRafsan/l2-a9-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd l2-a9-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=<backend_api_url>
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser:
   [http://localhost:3000](http://localhost:3000)

## Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
3. Deploy to **Vercel** for hosting.



## Future Enhancements
- Add subscription-based plans for premium content.
- Implement a notification system for new reviews and comments.
- Enhance admin dashboard with advanced analytics.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---



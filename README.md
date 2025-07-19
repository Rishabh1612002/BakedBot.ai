# BakedBot.ai


PROTOTYPE - https://v0-prototype-deliverables-rishabhsuravaram161-4523s-projects.vercel.app

# AI-Powered Product Recommendation System with RAG

A full-stack Next.js application that demonstrates an AI-powered recommendation system using Retrieval-Augmented Generation (RAG) for enhanced product recommendations.

## 🚀 Features

- **AI-Powered Recommendations**: Intelligent product matching based on user preferences
- **RAG Implementation**: Enhanced product knowledge through retrieval-augmented generation
- **Colorful, Modern UI**: Beautiful, responsive interface with gradient designs
- **Real-time Filtering**: Filter by product type and budget
- **Comprehensive Product Data**: 10+ diverse products across multiple categories
- **Scientific Backing**: Ingredient knowledge base with research-backed information

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **AI/ML**: Custom recommendation algorithm with RAG implementation
- **Data**: Mock product and ingredient knowledge databases

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ai-recommendation-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Architecture Overview

### Backend Components

#### API Endpoints
- `/api/products` - Returns all products and ingredient knowledge
- `/api/recommendations` - Generates personalized recommendations

#### RAG Implementation
The RAG system enhances recommendations by:
1. **Retrieval**: Finding relevant ingredient knowledge based on recommended products
2. **Augmentation**: Combining product data with scientific backing and properties
3. **Generation**: Creating enhanced insights and reasoning for recommendations

#### Recommendation Algorithm
The recommendation engine uses multiple factors:
- **Keyword Matching**: Matches user preferences with product effects and descriptions
- **Ingredient Analysis**: Considers ingredient properties and effects
- **Quality Scoring**: Factors in product ratings and popularity
- **Filtering**: Applies type and budget constraints

### Frontend Components

#### Main Interface (`app/page.tsx`)
- User preference input with rich text area
- Product type and budget filtering
- Real-time recommendation display
- Enhanced product cards with detailed information

#### Styling System
- Gradient color schemes for visual appeal
- Category-based color coding
- Responsive design for all screen sizes
- Interactive hover effects and animations

## 📊 Data Structure

### Product Schema
\`\`\`typescript
interface Product {
  id: number
  name: string
  type: string // beverage, edible, topical, supplement, aromatherapy
  description: string
  effects: string[]
  ingredients: string[]
  price: number
  sales_data: {
    units_sold: number
    last_month_revenue: number
  }
  rating: number
  image_color: string // Tailwind gradient classes
}
\`\`\`

### Ingredient Knowledge Schema
\`\`\`typescript
interface IngredientKnowledge {
  name: string
  properties: string
  common_effects: string[]
  scientific_backing: string
}
\`\`\`

## 🧠 AI/ML Implementation Details

### Recommendation Algorithm
1. **Text Processing**: Tokenizes user preferences into keywords
2. **Scoring System**: 
   - Effects matching: 3 points per match
   - Description matching: 2 points per match
   - Ingredient matching: 1 point per match
   - Rating boost: rating × 0.5
   - Popularity boost: (units_sold / 100) × 0.3
3. **Filtering**: Applies type and budget constraints
4. **Ranking**: Sorts by total score, returns top 3

### RAG System
1. **Knowledge Retrieval**: Finds ingredient information for recommended products
2. **Context Augmentation**: Combines scientific backing with product properties
3. **Insight Generation**: Creates comprehensive explanations for recommendations

## 🎨 Design Decisions

### Color System
- **Product Types**: Each category has a distinct color scheme
- **Effects**: Color-coded badges for easy visual identification
- **Gradients**: Modern gradient backgrounds for visual appeal
- **Status Indicators**: Green for prices, yellow for ratings

### User Experience
- **Progressive Disclosure**: Shows results only after user input
- **Visual Hierarchy**: Clear information architecture
- **Responsive Design**: Works on all device sizes
- **Loading States**: Smooth loading animations

## 🔮 Future Enhancements

### Technical Improvements
1. **Vector Embeddings**: Implement semantic similarity using embeddings
2. **Machine Learning**: Train models on user interaction data
3. **Real-time Learning**: Adapt recommendations based on user feedback
4. **A/B Testing**: Test different recommendation strategies

### Feature Additions
1. **User Profiles**: Persistent user preferences and history
2. **Social Features**: User reviews and ratings
3. **Inventory Management**: Real-time stock tracking
4. **Payment Integration**: Complete e-commerce functionality

### Data Enhancements
1. **Larger Dataset**: Expand to hundreds of products
2. **Real Scientific Data**: Integrate with research databases
3. **User Behavior Analytics**: Track and analyze user interactions
4. **Seasonal Trends**: Incorporate time-based recommendations

## 🧪 Testing the System

### Sample Queries to Try
1. **Relaxation**: "I need something to help me relax after work and improve my sleep"
2. **Energy**: "Looking for natural energy boost without caffeine crash"
3. **Pain Relief**: "Need something for muscle pain and inflammation"
4. **Focus**: "Want to improve concentration and mental clarity"
5. **Stress**: "Help with stress and anxiety management"

### Expected Behavior
- Relevant products should appear based on keyword matching
- RAG insights should provide scientific backing for ingredients
- Reasoning should explain why products were selected
- Filtering should work correctly for type and budget

## 📈 Performance Considerations

### Current Optimizations
- Client-side filtering for instant results
- Efficient scoring algorithm with O(n) complexity
- Minimal API calls with comprehensive responses
- Responsive design with optimized rendering

### Scalability Notes
- Algorithm scales linearly with product count
- RAG system can handle larger knowledge bases
- Frontend optimized for hundreds of products
- API designed for high-throughput scenarios

## 🤝 Contributing

This is a prototype demonstration project. For production use, consider:
1. Implementing proper error handling
2. Adding comprehensive testing
3. Setting up monitoring and analytics
4. Implementing security best practices
5. Adding database persistence

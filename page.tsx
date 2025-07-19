"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, ShoppingCart, Star, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: number
  name: string
  type: string
  description: string
  effects: string[]
  ingredients: string[]
  price: number
  sales_data: {
    units_sold: number
    last_month_revenue: number
  }
  rating: number
  image_color: string
}

interface RecommendationResponse {
  recommendations: Product[]
  rag_insights: string
  reasoning: string
}

const typeColors = {
  beverage: "bg-blue-100 text-blue-800 border-blue-200",
  edible: "bg-green-100 text-green-800 border-green-200",
  topical: "bg-purple-100 text-purple-800 border-purple-200",
  supplement: "bg-orange-100 text-orange-800 border-orange-200",
  aromatherapy: "bg-pink-100 text-pink-800 border-pink-200",
}

const effectColors = {
  relaxation: "bg-indigo-50 text-indigo-700",
  "stress relief": "bg-cyan-50 text-cyan-700",
  "energy boost": "bg-yellow-50 text-yellow-700",
  "pain relief": "bg-red-50 text-red-700",
  "improved sleep": "bg-violet-50 text-violet-700",
  "mood enhancement": "bg-emerald-50 text-emerald-700",
  focus: "bg-amber-50 text-amber-700",
  "appetite stimulation": "bg-lime-50 text-lime-700",
}

export default function RecommendationSystem() {
  const [preferences, setPreferences] = useState("")
  const [selectedType, setSelectedType] = useState("any")
  const [budget, setBudget] = useState("")
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    // Load all products on component mount
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products))
      .catch((err) => console.error("Failed to load products:", err))
  }, [])

  const handleGetRecommendations = async () => {
    if (!preferences.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferences,
          type: selectedType,
          budget: budget ? Number.parseFloat(budget) : undefined,
        }),
      })

      const data = await response.json()
      setRecommendations(data)
    } catch (error) {
      console.error("Error getting recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              BakedBot.ai
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">AI-Powered Product Recommendation System</p>
          <p className="text-sm text-gray-500">Powered by RAG Technology for Enhanced Personalization</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-2 border-purple-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Tell Us Your Preferences
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Describe what you're looking for and we'll find the perfect match
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="preferences" className="text-sm font-medium text-gray-700">
                    What are you looking for? *
                  </Label>
                  <Textarea
                    id="preferences"
                    placeholder="e.g., I need something to help me relax after work, reduce stress, and improve my sleep quality..."
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="mt-2 min-h-[100px] border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                    Product Type (Optional)
                  </Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="mt-2 border-purple-200 focus:border-purple-400">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any type</SelectItem>
                      <SelectItem value="beverage">Beverages</SelectItem>
                      <SelectItem value="edible">Edibles</SelectItem>
                      <SelectItem value="topical">Topicals</SelectItem>
                      <SelectItem value="supplement">Supplements</SelectItem>
                      <SelectItem value="aromatherapy">Aromatherapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                    Budget (Optional)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Max price in USD"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="mt-2 border-purple-200 focus:border-purple-400"
                  />
                </div>

                <Button
                  onClick={handleGetRecommendations}
                  disabled={loading || !preferences.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Perfect Matches...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get AI Recommendations
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {recommendations ? (
              <div className="space-y-6">
                {/* RAG Insights */}
                <Card className="border-2 border-blue-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      AI Insights & Reasoning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Enhanced Product Knowledge:</h4>
                        <p className="text-gray-600 leading-relaxed">{recommendations.rag_insights}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Recommendation Reasoning:</h4>
                        <p className="text-gray-600 leading-relaxed">{recommendations.reasoning}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    Personalized Recommendations
                  </h2>
                  <div className="grid gap-6">
                    {recommendations.recommendations.map((product, index) => (
                      <Card
                        key={product.id}
                        className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl ${product.image_color}`}
                            >
                              {product.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge className={typeColors[product.type as keyof typeof typeColors]}>
                                      {product.type}
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                      <span className="text-sm font-medium">{product.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-green-600">${product.price}</div>
                                  <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <TrendingUp className="h-3 w-3" />
                                    {product.sales_data.units_sold} sold
                                  </div>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Effects:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {product.effects.map((effect) => (
                                      <Badge
                                        key={effect}
                                        variant="secondary"
                                        className={effectColors[effect as keyof typeof effectColors]}
                                      >
                                        {effect}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Key Ingredients:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ingredient) => (
                                      <Badge key={ingredient} variant="outline" className="border-gray-300">
                                        {ingredient}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Card className="border-2 border-gray-100 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Find Your Perfect Match?</h3>
                  <p className="text-gray-500">
                    Tell us about your preferences and let our AI recommend the best products for you.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* All Products Preview */}
        {allProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore Our Full Product Range</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.slice(0, 6).map((product) => (
                <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${product.image_color}`}
                      >
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <Badge className={`${typeColors[product.type as keyof typeof typeColors]} text-xs`}>
                          {product.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600">${product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

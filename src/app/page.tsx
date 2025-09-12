'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Search, ShoppingCart, Plus, Minus, X, Utensils, Phone, MapPin, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'

interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  category: string
}

interface CartItem extends MenuItem {
  quantity: number
}

const menuData: MenuItem[] = [
  // PANEER
  { id: 'paneer-tikka-masala', name: 'Paneer Tikka Masala', price: 230, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-rajwadi', name: 'Paneer Rajwadi', price: 219, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-kadhai', name: 'Paneer Kadhai', price: 215, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-handi', name: 'Paneer Handi', price: 215, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-tawa-masala', name: 'Paneer Tawa Masala', price: 215, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'palak-paneer', name: 'Palak Paneer', price: 205, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-bhurji-dry', name: 'Paneer Bhurji Dry', price: 240, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'mutter-paneer', name: 'Mutter Paneer', price: 210, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-lababdar', name: 'Paneer Lababdar', price: 220, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', price: 219, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-toofani', name: 'Paneer Toofani', price: 229, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-pasanda', name: 'Paneer Pasanda', price: 220, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-tawa-tikka', name: 'Paneer Tawa Tikka', price: 210, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-angara', name: 'Paneer Angara', price: 250, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'paneer-bhurji', name: 'Paneer Bhurji', price: 219, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  { id: 'cheese-butter-masala', name: 'Cheese Butter Masala', price: 240, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'PANEER' },
  
  // VEG
  { id: 'veg-kholapuri', name: 'Veg Kolhalapuri', price: 179, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'VEG' },
  { id: 'veg-kadhai', name: 'Veg Kadhai', price: 185, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'VEG' },
  { id: 'veg-jaipuri', name: 'Veg Jaipuri', price: 189, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'VEG' },
  { id: 'chana-masala', name: 'Chana Masala', price: 179, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'VEG' },
  { id: 'veg-devani-handi', name: 'Veg Devani Handi', price: 179, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'VEG' },
  
  // KAJU
  { id: 'kaju-curry', name: 'Kaju Curry', price: 279, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'KAJU' },
  { id: 'kaju-masala', name: 'Kaju Masala', price: 290, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'KAJU' },
  { id: 'kaju-navabi', name: 'Kaju Navabi', price: 269, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'KAJU' },
  { id: 'kaju-paneer-masala', name: 'Kaju Paneer Masala', price: 305, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'KAJU' },
  { id: 'kaju-angara', name: 'Kaju Angara', price: 290, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'KAJU' },
  { id: 'cheese-kaju-masala', name: 'Cheese Kaju Masala', price: 310, description: 'A deliciously cooked Indian dish with authentic spices.', category: 'KAJU' },
  
  // ROTI
  { id: 'roti-plain', name: 'Roti Plain', price: 20, description: 'Freshly baked flatbread', category: 'ROTI' },
  { id: 'roti-butter', name: 'Roti Butter', price: 30, description: 'Freshly baked flatbread with butter', category: 'ROTI' },
  { id: 'kulcha-plain', name: 'Kulcha Plain', price: 40, description: 'Soft leavened flatbread', category: 'ROTI' },
  { id: 'kulcha-butter', name: 'Kulcha Butter', price: 50, description: 'Soft leavened flatbread with butter', category: 'ROTI' },
  { id: 'naan-plain', name: 'Naan Plain', price: 30, description: 'Traditional tandoori bread', category: 'ROTI' },
  { id: 'naan-butter', name: 'Naan Butter', price: 40, description: 'Traditional tandoori bread with butter', category: 'ROTI' },
  { id: 'garlic-paratha', name: 'Garlic Paratha', price: 130, description: 'Layered flatbread with garlic', category: 'ROTI' },
  { id: 'lachha-paratha', name: 'Lachha Paratha', price: 55, description: 'Multi-layered crispy flatbread', category: 'ROTI' },
  { id: 'cheese-naan', name: 'Cheese Naan', price: 200, description: 'Tandoori bread stuffed with cheese', category: 'ROTI' },
  
  // ACCOMPANIMENTS
  { id: 'roasted-papad', name: 'Roasted Papad', price: 20, description: 'Crispy roasted lentil crackers', category: 'ACCOMPANIMENTS' },
  { id: 'fry-papad', name: 'Fry Papad', price: 30, description: 'Crispy fried lentil crackers', category: 'ACCOMPANIMENTS' },
  { id: 'masala-papad', name: 'Masala Papad', price: 50, description: 'Papad topped with spices and onions', category: 'ACCOMPANIMENTS' },
  { id: 'cheese-masala-papad', name: 'Cheese Masala Papad', price: 60, description: 'Papad with cheese and spices', category: 'ACCOMPANIMENTS' },
  { id: 'raita', name: 'Raita', price: 30, description: 'Cool yogurt with spices', category: 'ACCOMPANIMENTS' },
  
  // DAL
  { id: 'dal-fry', name: 'Dal Fry', price: 140, description: 'Spiced lentil curry', category: 'DAL' },
  { id: 'dal-tadka', name: 'Dal Tadka', price: 160, description: 'Tempered lentil curry', category: 'DAL' },
  { id: 'dal-makhni', name: 'Dal Makhni', price: 180, description: 'Creamy black lentil curry', category: 'DAL' },
  
  // CHINESE
  { id: 'hakka-noodles', name: 'Hakka Noodles', price: 160, description: 'Stir-fried noodles with vegetables', category: 'CHINESE' },
  { id: 'manchurian-dry', name: 'Manchurian Dry', price: 170, description: 'Crispy vegetable balls in Indo-Chinese sauce', category: 'CHINESE' },
  { id: 'manchurian-gravy', name: 'Manchurian Gravy', price: 170, description: 'Vegetable balls in Indo-Chinese gravy', category: 'CHINESE' },
  { id: 'chinese-bhel', name: 'Chinese Bhel', price: 170, description: 'Crispy noodles with vegetables and sauces', category: 'CHINESE' },
  { id: 'manchurian-rice', name: 'Manchurian Rice', price: 160, description: 'Fried rice with Manchurian balls', category: 'CHINESE' },
  { id: 'manchurian-noodles', name: 'Manchurian Noodles', price: 160, description: 'Noodles with Manchurian sauce', category: 'CHINESE' },
  { id: 'paneer-chilly-dry', name: 'Paneer Chilly Dry', price: 250, description: 'Spicy paneer with Indo-Chinese flavors', category: 'CHINESE' },
  
  // BARBEQUE
  { id: 'paneer-tikka-dry', name: 'Paneer Tikka (Dry)', price: 250, description: 'Grilled paneer cubes with spices', category: 'BARBEQUE' },
  { id: 'paneer-malai-tikka', name: 'Paneer Malai Tikka', price: 280, description: 'Creamy marinated grilled paneer', category: 'BARBEQUE' },
  { id: 'chaap-masala', name: 'Chaap (Masala)', price: 250, description: 'Spiced soy chaap', category: 'BARBEQUE' },
  { id: 'chaap-achari', name: 'Chaap (Achari)', price: 250, description: 'Pickled spiced soy chaap', category: 'BARBEQUE' },
  { id: 'chaap-malai', name: 'Chaap (Malai)', price: 280, description: 'Creamy marinated soy chaap', category: 'BARBEQUE' },
  { id: 'chaap-afghani', name: 'Chaap (Afghani)', price: 280, description: 'Afghani style soy chaap', category: 'BARBEQUE' },
  
  // CHOLE KULCHA
  { id: 'chhole-bhatura', name: 'Chhole Bhature', price: 180, description: 'Spiced chickpeas with fluffy fried bread', category: 'CHOLE KULCHA' },
  { id: 'butter-chole-bhatura', name: 'Butter Chole Bhature', price: 200, description: 'Chhole bhatura with extra butter', category: 'CHOLE KULCHA' },
  { id: 'cheese-chole-bhatura', name: 'Cheese Chole Bhature', price: 220, description: 'Chhole bhatura with cheese', category: 'CHOLE KULCHA' },
  { id: 'butter-milk', name: 'Butter Milk', price: 20, description: 'Refreshing buttermilk drink', category: 'CHOLE KULCHA' },
  { id: 'masala', name: 'Masala', price: 30, description: 'Spiced buttermilk drink', category: 'CHOLE KULCHA' },
  
  // RICE
  { id: 'steam-rice', name: 'Steam Rice', price: 120, description: 'Steamed basmati rice', category: 'RICE' },
  { id: 'jeera-rice', name: 'Jeera Rice', price: 130, description: 'Rice tempered with cumin seeds', category: 'RICE' },
  { id: 'veg-pulav', name: 'Veg Pulav', price: 170, description: 'Rice cooked with vegetables and spices', category: 'RICE' },
  { id: 'kashmiri-pulav', price: 220, name: 'Kashmiri Pulav', description: 'Aromatic rice with dry fruits and spices', category: 'RICE' },
  
  // BIRYANI
  { id: 'veg-punjabi-biryani', name: 'Veg Punjabi Biryani', price: 275, description: 'Punjabi style vegetable biryani', category: 'BIRYANI' },
  { id: 'hyderabadi-biryani', name: 'Hyderabadi Biryani', price: 250, description: 'Hyderabadi style vegetable biryani', category: 'BIRYANI' },
  { id: 'lakhanvi-biryani', name: 'LakhNavi Biryani', price: 270, description: 'Lucknow style vegetable biryani', category: 'BIRYANI' },
  { id: 'chaap-biryani', name: 'Chaap Biryani', price: 260, description: 'Biryani with soy chaap', category: 'BIRYANI' },
  { id: 'paneer-tikka-biryani', name: 'Paneer Tikka Biryani', price: 275, description: 'Biryani with paneer tikka', category: 'BIRYANI' },
  { id: 'dum-biryani', name: 'Dum Biryani', price: 275, description: 'Slow-cooked sealed pot biryani', category: 'BIRYANI' },
  
  // SIZZLERS
  { id: 'dum-biryani-sizzler', name: 'Dum Biryani Sizzler', price: 550, description: 'Sizzling biryani with vegetables', category: 'SIZZLERS' },
  { id: 'veg-grilled-sizzler', name: 'Veg Grilled Sizzler', price: 570, description: 'Grilled vegetables on sizzling plate', category: 'SIZZLERS' },
  { id: 'bomb-sizzler', name: 'Bomb Sizzler', price: 550, description: 'Explosive mix of flavors on sizzler', category: 'SIZZLERS' },
  { id: 'china-town-sizzler', name: 'China Town Sizzler', price: 550, description: 'Indo-Chinese fusion sizzler', category: 'SIZZLERS' },
  { id: 'sp-sizzler', name: 'SP Sizzler', price: 600, description: 'Special sizzler with premium ingredients', category: 'SIZZLERS' },
  { id: 'veg-scrambled-sizzler', name: 'Veg Scrambled Sizzler', price: 550, description: 'Scrambled vegetables on sizzler', category: 'SIZZLERS' },
  { id: 'country-sizzler', name: 'Country Sizzler', price: 550, description: 'Rustic style vegetable sizzler', category: 'SIZZLERS' },
  { id: 'lasaniya-desi-tadka', name: 'Lasaniya Desi Tadka', price: 550, description: 'Garlic flavored sizzler', category: 'SIZZLERS' },
  { id: 'italian-sizzler', name: 'Italian Sizzler', price: 550, description: 'Italian style vegetable sizzler', category: 'SIZZLERS' },
  { id: 'paneer-stick-sizzler', name: 'Paneer Stick Sizzler', price: 550, description: 'Paneer sticks on sizzling plate', category: 'SIZZLERS' },
  
  // PASTA
  { id: 'white-sauce-pasta', name: 'White Sauce Pasta', price: 250, description: 'Creamy white sauce pasta with vegetables', category: 'PASTA' },
  { id: 'red-sauce-pasta', name: 'Red Sauce Pasta', price: 250, description: 'Tomato based pasta with vegetables', category: 'PASTA' },
  { id: 'mix-sauce-pasta', name: 'Mix Sauce Pasta', price: 250, description: 'Combination of white and red sauce', category: 'PASTA' },
  { id: 'fries-masala', name: 'Fries Masala', price: 130, description: 'Spiced French fries', category: 'PASTA' }
]

export default function RestaurantMenu() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showUserDetailsForm, setShowUserDetailsForm] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!isCartOpen) {
      setShowUserDetailsForm(false)
      setUserName('')
      setUserAddress('')
      setFormError('')
    }
  }, [isCartOpen])

  const filteredItems = menuData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prev, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }
    setCart(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ))
  }

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    setShowUserDetailsForm(true)
  }

  const handlePlaceOrder = () => {
    if (!userName.trim() || !userAddress.trim()) {
      setFormError('Name and Address are required.')
      return
    }
    setFormError('')

    const message = cart.map(item => `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`).join('\n')
    const total = getTotalPrice()
    const whatsappMessage = `Hello! I\'d like to order:\n\n${message}\n\nTotal: ₹${total}\n\nName: ${userName}\nAddress: ${userAddress}\n\nThank you!`
    const whatsappUrl = `https://wa.me/9601834906?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleFloatingCheckoutClick = () => {
    setIsCartOpen(true);
    setShowUserDetailsForm(true);
  }

  const handleZomatoOrder = () => {
    window.open('https://link.zomato.com/xqzv/rshare?id=5232558430563057', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src="/gravy-grills-logo.jpg"
                  alt="Gravy & Grills Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-orange-500 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>'
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Gravy & Grills</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Managed by Hungry Birds</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('tel:9601834906', '_blank')}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://maps.app.goo.gl/d6obgmePqi5HuMBz8', '_blank')}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Find Us
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZomatoOrder}
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  Order on Zomato
                </Button>
              </div>
              <ThemeToggle />
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Utensils className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[250px]">
                    <SheetHeader>
                      <SheetTitle>More Options</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <Button
                        variant="outline"
                        onClick={() => window.open('tel:9601834906', '_blank')}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open('https://maps.app.goo.gl/d6obgmePqi5HuMBz8', '_blank')}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Find Us
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleZomatoOrder}
                        className="text-orange-600 border-orange-600 hover:bg-orange-50"
                      >
                        Order on Zomato
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        {Object.entries(
          filteredItems.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = []
            acc[item.category].push(item)
            return acc
          }, {} as Record<string, MenuItem[]>)
        ).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 sticky top-20 bg-gray-50 dark:bg-gray-900 py-2">
              {category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                          <img
                            src={`/${item.name.toLowerCase().replace(/[\s()]/g, '_').replace(/__/g, '_')}.avif`}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const baseName = `/${item.name.toLowerCase().replace(/[\s()]/g, '_').replace(/__/g, '_')}`;
                              const currentSrc = target.src;
                              if (currentSrc.endsWith('.avif')) {
                                target.src = `${baseName}.jpg`;
                              } else if (currentSrc.endsWith('.jpg')) {
                                target.src = `${baseName}.png`;
                              } else if (currentSrc.endsWith('.png')) {
                                target.src = `${baseName}.jpeg`;
                              } else if (currentSrc.endsWith('.jpeg')) {
                                target.src = `${baseName}.webp`;
                              } else if (currentSrc.endsWith('.avif')) {
                                target.src = '/fries_masala_.avif';
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">₹{item.price}</span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(item)}
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50"
          >
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">View Cart ({getTotalItems()})</span>
                  <span className="sm:hidden">({getTotalItems()})</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </Button>
                <Button
                  onClick={handleFloatingCheckoutClick}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <span className="hidden sm:inline">Checkout</span>
                  <ShoppingCart className="w-5 h-5 sm:hidden" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl dark:bg-gray-800 dark:border-gray-700">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <Card key={item.id} className="dark:bg-gray-700 dark:border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Separator />
                <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                  <span>Total:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                {!showUserDetailsForm ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCheckout}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Checkout on WhatsApp
                    </Button>
                    <Button
                      onClick={handleZomatoOrder}
                      variant="outline"
                      className="flex-1 text-orange-600 border-orange-600 hover:bg-orange-50"
                    >
                      Order on Zomato
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                      placeholder="Address"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                    />
                    {formError && <p className="text-sm text-red-500">{formError}</p>}
                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Place Now
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Digital Menu crafted with precision by{' '}
                <a 
                  href="https://www.lazlle.studio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                >
                  Lazlle & Co
                </a>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional QR Code Menu Solutions for Restaurants
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>9601834906</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Find us on Google Maps</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                © 2024 Gravy & Grills. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
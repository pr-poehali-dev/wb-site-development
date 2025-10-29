import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const mockProducts = [
  { id: 1, name: 'Беспроводные наушники', price: 4990, category: 'Электроника', image: '🎧', rating: 4.8 },
  { id: 2, name: 'Смарт-часы', price: 12990, category: 'Электроника', image: '⌚', rating: 4.9 },
  { id: 3, name: 'Рюкзак городской', price: 2490, category: 'Аксессуары', image: '🎒', rating: 4.6 },
  { id: 4, name: 'Кроссовки спортивные', price: 5990, category: 'Одежда', image: '👟', rating: 4.7 },
  { id: 5, name: 'Термос', price: 1290, category: 'Товары для дома', image: '🥤', rating: 4.5 },
  { id: 6, name: 'Настольная лампа', price: 3490, category: 'Товары для дома', image: '💡', rating: 4.8 },
  { id: 7, name: 'Фитнес-браслет', price: 3990, category: 'Электроника', image: '📱', rating: 4.6 },
  { id: 8, name: 'Книга "Успех"', price: 890, category: 'Книги', image: '📚', rating: 4.9 },
];

const categories = ['Все', 'Электроника', 'Одежда', 'Аксессуары', 'Товары для дома', 'Книги'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [activeSection, setActiveSection] = useState('home');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const searchSuggestions = searchQuery.length > 0 
    ? mockProducts
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
        .map(p => p.name)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center text-2xl">
                🛍️
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MarketPlace
              </h1>
            </div>

            <div className="flex-1 max-w-2xl relative">
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Найти товар..."
                  className="pl-12 pr-4 h-12 rounded-2xl border-2 border-purple-200 focus:border-purple-400 transition-all"
                />
              </div>
              
              {searchSuggestions.length > 0 && searchQuery && (
                <Card className="absolute top-full mt-2 w-full animate-fade-in shadow-xl border-purple-100">
                  <CardContent className="p-2">
                    {searchSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-purple-50 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <Icon name="Search" size={16} className="text-purple-400" />
                        <span className="text-sm">{suggestion}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative hover-scale rounded-full">
                <Icon name="Heart" size={22} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 gradient-orange text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative hover-scale rounded-full">
                <Icon name="ShoppingCart" size={22} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 gradient-purple text-xs">
                  5
                </Badge>
              </Button>
              <Button className="gradient-blue hover-scale rounded-full px-6 ml-2">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>

          <nav className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
              { id: 'cart', label: 'Корзина', icon: 'ShoppingCart' },
              { id: 'favorites', label: 'Избранное', icon: 'Heart' },
              { id: 'orders', label: 'Заказы', icon: 'Package' },
              { id: 'sellers', label: 'Продавцам', icon: 'Store' },
              { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
            ].map((section) => (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                className={`rounded-full whitespace-nowrap transition-all ${
                  activeSection === section.id 
                    ? 'gradient-purple hover-scale shadow-lg' 
                    : 'hover:bg-purple-50'
                }`}
              >
                <Icon name={section.icon as any} size={16} className="mr-2" />
                {section.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Умный поиск с фильтрами
          </h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'gradient-purple hover-scale shadow-lg'
                    : 'border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <Card 
              key={product.id} 
              className="group hover-scale cursor-pointer overflow-hidden border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all animate-slide-up rounded-3xl"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-48 gradient-purple animate-gradient flex items-center justify-center text-7xl">
                {product.image}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all"
                >
                  <Icon name="Heart" size={18} className="text-pink-500" />
                </Button>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2 flex-1">{product.name}</h3>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">(247)</span>
                </div>
                <Badge variant="secondary" className="mb-3 rounded-full">
                  {product.category}
                </Badge>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {product.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <Button size="sm" className="gradient-blue hover-scale rounded-full shadow-lg">
                    <Icon name="ShoppingCart" size={16} className="mr-1" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-muted-foreground mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить поисковый запрос или фильтры</p>
          </div>
        )}
      </main>

      <footer className="mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4">MarketPlace</h4>
              <p className="text-white/80 text-sm">Современная платформа для покупок с умным поиском</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Покупателям</h5>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Как сделать заказ</li>
                <li>Оплата и доставка</li>
                <li>Возврат товара</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Продавцам</h5>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Начать продавать</li>
                <li>Условия работы</li>
                <li>Аналитика продаж</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Контакты</h5>
              <ul className="space-y-2 text-sm text-white/80">
                <li>8 800 555-35-35</li>
                <li>support@marketplace.ru</li>
                <li>Работаем 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

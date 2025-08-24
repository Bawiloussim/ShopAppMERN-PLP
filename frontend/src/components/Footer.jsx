const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">ShopMERN</h3>
                <p className="text-gray-400">
                Votre destination shopping préférée pour tous vos besoins en électronique et gadgets.
                </p>
            </div>
            <div>
                <h4 className="font-bold mb-4">Liens rapides</h4>
                <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="/products" className="text-gray-400 hover:text-white">Produits</a></li>
                <li><a href="/cart" className="text-gray-400 hover:text-white">Panier</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">À propos</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Informations</h4>
                <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Livraison & Retours</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <address className="text-gray-400 not-italic">
                <p className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i> 
                    Mataheko, Accra-Ghana
                </p>
                <p className="my-2 flex items-center">
                    <i className="fas fa-phone mr-2"></i> 
                    +233 244831768
                </p>
                <p className="flex items-center">
                    <i className="fas fa-envelope mr-2"></i> 
                    bawiloussimngbbabou1@gmail.com
                </p>
                </address>
            </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ShopApp. All lows reserved.</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;
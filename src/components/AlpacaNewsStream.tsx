
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import alpacaApi from '@/services/alpacaApi';
import { toast } from 'sonner';

const AlpacaNewsStream = () => {
  const [newsItems, setNewsItems] = useState<Alpaca.NewsItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectToStream = () => {
    if (ws) {
      ws.close();
    }

    const newsWs = alpacaApi.connectToNewsStream((news) => {
      setNewsItems((prevItems) => [news, ...prevItems].slice(0, 20));
      toast.info(`New story: ${news.headline.substring(0, 60)}...`);
    });

    if (newsWs) {
      setWs(newsWs);
      setIsConnected(true);
    }
  };

  const disconnectFromStream = () => {
    if (ws) {
      ws.close();
      setWs(null);
      setIsConnected(false);
    }
  };

  // Fetch initial news on component mount
  useEffect(() => {
    const fetchInitialNews = async () => {
      const news = await alpacaApi.getNews({ limit: 10, sort: 'desc' });
      if (news) {
        setNewsItems(news);
      }
    };

    fetchInitialNews();
    
    return () => {
      disconnectFromStream();
    };
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" />
              Market News Stream
            </CardTitle>
            <CardDescription>
              Latest financial news from Alpaca API
            </CardDescription>
          </div>
          <div>
            {isConnected ? (
              <Button variant="outline" size="sm" onClick={disconnectFromStream}>
                Disconnect Stream
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={connectToStream}>
                Connect Live Stream
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {newsItems.length > 0 ? (
              newsItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-lg mb-2">{item.headline}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.symbols.map((symbol) => (
                      <Badge key={symbol} variant="outline">{symbol}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Source: {item.source}</span>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Read more <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <Newspaper className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                <p>No news items available</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlpacaNewsStream;

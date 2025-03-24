
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { NewsItem } from '@/services/financialApi';

interface StockNewsProps {
  news: NewsItem[];
  isLoading?: boolean;
}

const StockNews = ({ news, isLoading = false }: StockNewsProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Market News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!news || news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Market News</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No news available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index}>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group"
              >
                <div className="flex gap-3">
                  {item.thumbnail && (
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded">
                      <img 
                        src={item.thumbnail} 
                        alt="" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.publisher} • {new Date(item.publishedOn).toLocaleDateString()}
                    </p>
                    {item.summary && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </div>
              </a>
              {index < news.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockNews;

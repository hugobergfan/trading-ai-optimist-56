
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import { twentyFirstDevApi, ComponentSearchResult } from '@/services/twentyFirstDev';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from '@/components/ui/use-toast';
import { Sparkles } from '@/components/ui/sparkles';
import { GooeyDemo } from "@/components/ui/gooey-filter-demo";

const ComponentShowcase = () => {
  const [searchQuery, setSearchQuery] = useState('hero section');
  const [currentPage, setCurrentPage] = useState(1);
  const [queryToSearch, setQueryToSearch] = useState(searchQuery);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['components', queryToSearch, currentPage],
    queryFn: () => twentyFirstDevApi.searchComponents(queryToSearch, currentPage),
    enabled: !!queryToSearch,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setQueryToSearch(searchQuery);
  };

  const renderPagination = () => {
    if (!data || !data.metadata.pagination) return null;
    
    const { pagination } = data.metadata;
    const { total_pages, page } = pagination;
    
    const paginationItems = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(total_pages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === page}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {paginationItems}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(total_pages, prev + 1))}
              aria-disabled={page === total_pages}
              className={page === total_pages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container mx-auto py-16 px-4 relative min-h-screen">
      <SparklesDemo />
      
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Component Showcase</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Discover and browse AI-powered UI components from 21st.dev
        </p>
        
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Search
          </Button>
        </form>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-8">
          Error loading components. Please try again.
        </div>
      )}

      {data?.metadata && (
        <div className="text-sm text-muted-foreground text-center mb-8">
          Found {data.metadata.pagination.total} results. 
          Requests remaining: {data.metadata.requests_remaining}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data?.results.map((component) => (
          <Card key={component.demo_id} className="overflow-hidden flex flex-col h-full">
            <CardHeader>
              <CardTitle>{component.component_data.name}</CardTitle>
              <CardDescription>{component.component_data.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {component.preview_url && (
                <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-muted">
                  <img 
                    src={component.preview_url} 
                    alt={component.component_data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="text-sm">
                <p>Created by: {component.component_user_data.name}</p>
                <p>Used {component.usage_count} times</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Component details",
                    description: `Install command: ${component.component_data.install_command}`,
                  });
                }}
              >
                Details
              </Button>
              <Button 
                size="sm"
                onClick={async () => {
                  try {
                    const response = await twentyFirstDevApi.generatePrompt(component.demo_id);
                    toast({
                      title: "Prompt generated",
                      description: "The component prompt has been generated. Check the console for details.",
                    });
                    console.log("Generated Prompt:", response.prompt);
                  } catch (err) {
                    toast({
                      title: "Error",
                      description: "Failed to generate prompt",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Generate Prompt
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {renderPagination()}
      
      {/* Gooey Filter Demo */}
      <section className="border-t border-border/80 py-10">
        <h2 className="text-2xl font-bold mb-4">Gooey Filter Demo</h2>
        <GooeyDemo />
      </section>
    </div>
  );
};

const SparklesDemo = () => (
  <div className="flex flex-wrap justify-center gap-10 items-center py-10">
    <Sparkles id="sparkles-1" className="h-40 w-40">
      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
    </Sparkles>
    <Sparkles id="sparkles-2" className="h-40 w-40" particleColor="blue">
      <div className="h-20 w-20 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500" />
    </Sparkles>
    <Sparkles id="sparkles-3" className="h-40 w-40" particleColor="green">
      <div className="h-20 w-20 rotate-45 bg-gradient-to-r from-lime-500 to-green-500" />
    </Sparkles>
  </div>
);

export default ComponentShowcase;

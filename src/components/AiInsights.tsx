
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Bot, Loader2, Volume2, VolumeX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MarketBarometer, TickerPrediction } from '@/services/sharePredictionsApi';
import openaiApi from '@/services/openaiApi';
import elevenlabsApi, { VOICE_IDS } from '@/services/elevenlabsApi';
import { toast } from 'sonner';

interface AiInsightsProps {
  marketData?: MarketBarometer;
  ticker?: string;
  tickerData?: TickerPrediction;
}

const AiInsights = ({ marketData, ticker, tickerData }: AiInsightsProps) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  const generateInsights = async () => {
    setIsLoading(true);
    setInsights(null);
    
    try {
      let result: string | null = null;
      
      if (ticker && tickerData) {
        // Generate ticker-specific insights
        result = await openaiApi.analyzeStockTicker(ticker, tickerData);
      } else if (marketData) {
        // Generate market overview insights
        result = await openaiApi.generateMarketOverview(marketData);
      }
      
      if (result) {
        setInsights(result);
        toast.success("AI insights generated successfully");
      } else {
        toast.error("Failed to generate insights");
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      toast.error("Error generating AI insights");
    } finally {
      setIsLoading(false);
    }
  };
  
  const speakInsights = async () => {
    if (!insights) return;
    
    if (isPlaying && audioElement) {
      // Stop current playback
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
      setAudioElement(null);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Limit text length to avoid hitting API limits
      const textToSpeak = insights.length > 1000 
        ? insights.substring(0, 997) + '...' 
        : insights;
      
      const audio = await elevenlabsApi.speakText(
        textToSpeak,
        ticker ? VOICE_IDS.BRIAN : VOICE_IDS.JESSICA
      );
      
      if (audio) {
        setAudioElement(audio);
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
          setAudioElement(null);
        };
      } else {
        toast.error("Failed to convert text to speech");
      }
    } catch (error) {
      console.error('Error speaking insights:', error);
      toast.error("Error with text-to-speech conversion");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              AI-Powered Insights
              <Badge variant="outline" className="ml-2">
                GPT-4o
              </Badge>
            </CardTitle>
            <CardDescription>
              {ticker 
                ? `AI analysis for ${ticker} stock predictions`
                : "AI analysis of current market trends"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={speakInsights}
              disabled={!insights || isLoading}
            >
              {isLoading && isPlaying ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : isPlaying ? (
                <VolumeX className="h-4 w-4 mr-2" />
              ) : (
                <Volume2 className="h-4 w-4 mr-2" />
              )}
              {isPlaying ? "Stop" : "Speak"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={generateInsights}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Bot className="h-4 w-4 mr-2" />
              )}
              Generate Insights
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {insights ? (
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br/>') }} />
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-10">
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 animate-pulse">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-500 mt-4">Generating AI insights...</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <Bot className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="mb-2">No insights generated yet</p>
            <p className="text-sm">Click the Generate Insights button to analyze the current data with AI</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500 border-t pt-4">
        Powered by OpenAI GPT-4o and ElevenLabs for voice synthesis
      </CardFooter>
    </Card>
  );
};

export default AiInsights;

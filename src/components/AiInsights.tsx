
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Volume2, Brain, RefreshCw } from 'lucide-react';
import { toast } from "sonner";
import openaiApi from '@/services/openaiApi';
import elevenlabsApi, { VOICE_IDS } from '@/services/elevenlabsApi';

interface AiInsightsProps {
  marketData?: any;
  ticker?: string;
  tickerData?: any;
}

const AiInsights: React.FC<AiInsightsProps> = ({ marketData, ticker, tickerData }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const generateInsights = async () => {
    if (!marketData && !tickerData) {
      toast.error("No data available for analysis");
      return;
    }

    setLoading(true);
    try {
      let result: string | null;
      
      if (ticker && tickerData) {
        result = await openaiApi.analyzeStockTicker(ticker, tickerData);
      } else if (marketData) {
        result = await openaiApi.generateMarketOverview(marketData);
      } else {
        toast.error("Insufficient data for analysis");
        setLoading(false);
        return;
      }
      
      if (result) {
        setInsights(result);
        toast.success("AI analysis completed");
      } else {
        toast.error("Failed to generate insights");
      }
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("An error occurred while generating insights");
    } finally {
      setLoading(false);
    }
  };

  const speakInsights = async () => {
    if (!insights) {
      toast.error("No insights to speak");
      return;
    }

    // Stop current audio if playing
    if (currentAudio && isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
      return;
    }

    try {
      setIsPlaying(true);
      const audio = await elevenlabsApi.speakText(
        insights,
        VOICE_IDS.BRIAN
      );
      
      if (audio) {
        setCurrentAudio(audio);
        audio.onended = () => {
          setIsPlaying(false);
          setCurrentAudio(null);
        };
      } else {
        setIsPlaying(false);
        toast.error("Failed to convert text to speech");
      }
    } catch (error) {
      console.error("Error speaking insights:", error);
      setIsPlaying(false);
      toast.error("An error occurred while playing audio");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          AI Insights
        </CardTitle>
        <CardDescription>
          {ticker ? `AI analysis for ${ticker}` : "Market overview analysis"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights ? (
          <div className="text-sm text-gray-700 whitespace-pre-line">{insights}</div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Brain className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-center">
              Click the button below to generate AI-powered insights
              {ticker ? ` for ${ticker}` : " for the current market conditions"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={generateInsights}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Generate Insights
            </>
          )}
        </Button>
        {insights && (
          <Button
            variant={isPlaying ? "destructive" : "secondary"}
            size="sm"
            onClick={speakInsights}
          >
            {isPlaying ? "Stop" : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AiInsights;

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { benchmarkConfigSchema } from "@shared/schema";
import { generateDataset, benchmarkAlgorithm } from "./algorithms";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/benchmark", async (req, res) => {
    try {
      const config = benchmarkConfigSchema.parse(req.body);
      
      const results = [];
      
      for (const algorithmId of config.algorithms) {
        for (const size of config.datasetSizes) {
          try {
            const dataset = generateDataset(size, config.datasetType);
            const executionTime = benchmarkAlgorithm(algorithmId, dataset);
            
            results.push({
              algorithmId,
              datasetSize: size,
              executionTime,
            });
          } catch (error) {
            return res.status(400).json({
              error: `Failed to benchmark ${algorithmId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
          }
        }
      }
      
      res.json({
        results,
        timestamp: Date.now(),
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request data",
          details: error.errors,
        });
      }
      
      console.error("Benchmark error:", error);
      res.status(500).json({
        error: "Failed to run benchmark",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

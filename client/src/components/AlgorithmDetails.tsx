import { algorithmsMetadata, type AlgorithmType } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, Zap, HardDrive } from "lucide-react";

interface AlgorithmDetailsProps {
  selectedAlgorithms: AlgorithmType[];
}

export function AlgorithmDetails({ selectedAlgorithms }: AlgorithmDetailsProps) {
  if (selectedAlgorithms.length === 0) {
    return (
      <Card className="p-8" data-testid="component-empty-details">
        <div className="text-center space-y-2">
          <Info className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="text-lg font-medium text-muted-foreground">No algorithms selected</p>
          <p className="text-sm text-muted-foreground">
            Select algorithms from the sidebar to view detailed complexity information
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4" data-testid="component-algorithm-details">
      <h3 className="text-xl font-semibold">Algorithm Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedAlgorithms.map((algorithmId) => {
          const algorithm = algorithmsMetadata[algorithmId];

          return (
            <Card key={algorithmId} className="p-6" data-testid={`card-details-${algorithmId}`}>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold mb-2" data-testid={`text-detail-name-${algorithmId}`}>
                    {algorithm.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {algorithm.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-2">Time Complexity</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs font-mono">
                          Best: {algorithm.timeComplexity.best}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-mono">
                          Avg: {algorithm.timeComplexity.average}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-mono">
                          Worst: {algorithm.timeComplexity.worst}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HardDrive className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Space Complexity</p>
                      <Badge variant="secondary" className="text-xs font-mono">
                        {algorithm.spaceComplexity}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="-mx-6">
                  <AccordionItem value="details" className="border-0">
                    <AccordionTrigger className="px-6 text-sm font-medium hover:no-underline">
                      View More Details
                    </AccordionTrigger>
                    <AccordionContent className="px-6 space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">How it works</p>
                        <p className="text-sm text-muted-foreground">
                          {algorithm.explanation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">When to use</p>
                        <p className="text-sm text-muted-foreground">
                          {algorithm.whenToUse}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

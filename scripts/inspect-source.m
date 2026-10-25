#import <Foundation/Foundation.h>
#import <PDFKit/PDFKit.h>
#import <AppKit/AppKit.h>
#import <Vision/Vision.h>
int main(int argc, const char *argv[]) { @autoreleasepool {
  PDFDocument *doc = [[PDFDocument alloc] initWithURL:[NSURL fileURLWithPath:@(argv[1])]];
  NSMutableArray *pages = [NSMutableArray array];
  for (NSUInteger i=0; i<doc.pageCount; i++) { @autoreleasepool {
    PDFPage *page = [doc pageAtIndex:i];
    NSImage *image = [page thumbnailOfSize:NSMakeSize(1700,2300) forBox:kPDFDisplayBoxMediaBox];
    CGRect rect = CGRectMake(0,0,image.size.width,image.size.height);
    CGImageRef cg = [image CGImageForProposedRect:&rect context:nil hints:nil];
    VNRecognizeTextRequest *request = [[VNRecognizeTextRequest alloc] init];
    request.recognitionLevel = VNRequestTextRecognitionLevelAccurate;
    request.recognitionLanguages = @[@"fi-FI", @"en-US"];
    request.usesLanguageCorrection = YES;
    VNImageRequestHandler *handler = [[VNImageRequestHandler alloc] initWithCGImage:cg options:@{}];
    NSError *error = nil;
    if (![handler performRequests:@[request] error:&error]) { fprintf(stderr, "%s\n", error.description.UTF8String); return 1; }
    NSMutableArray *lines = [NSMutableArray array];
    for (VNRecognizedTextObservation *observation in request.results) { [lines addObject:[observation topCandidates:1].firstObject.string]; }
    [pages addObject:@{@"page":@(i+1), @"text":[lines componentsJoinedByString:@"\n"]}];
    fprintf(stderr,"OCR %lu/%lu\n",i+1,doc.pageCount);
  }}
  NSData *data = [NSJSONSerialization dataWithJSONObject:pages options:NSJSONWritingPrettyPrinted error:nil];
  [data writeToFile:@(argv[2]) atomically:YES];
} return 0; }

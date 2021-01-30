#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>

#import <UMCore/UMAppDelegateWrapper.h>
 
@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

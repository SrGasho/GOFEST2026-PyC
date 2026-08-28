@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.runtime.collectAsState
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.gofest.shake.ui.ShakeViewModel
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.screens.AlertsScreen
import com.gofest.shake.ui.screens.BeaconScreen
import com.gofest.shake.ui.screens.HomeScreen
import com.gofest.shake.ui.screens.MeScreen
import com.gofest.shake.ui.screens.PersonScreen
import com.gofest.shake.ui.screens.ProfileScreen
import com.gofest.shake.ui.screens.ReportScreen
import com.gofest.shake.ui.screens.SearchScreen

private object Routes {
    const val HOME = "home"
    const val SEARCH = "search"
    const val ALERTS = "alerts"
    const val ME = "me"
    const val BEACON = "beacon"
    const val PROFILE = "profile"
    const val REPORT = "report"
    const val PERSON = "person/{personId}"

    fun person(id: String) = "person/$id"
}

private data class TopLevelItem(val route: String, val label: String, val icon: String)

private val TOP_LEVEL = listOf(
    TopLevelItem(Routes.HOME, "Inicio", "home"),
    TopLevelItem(Routes.SEARCH, "Buscar", "person_search"),
    TopLevelItem(Routes.ALERTS, "Alertas", "notifications"),
    TopLevelItem(Routes.ME, "Yo", "account_circle"),
)

@Composable
fun ShakeNavHost() {
    val vm: ShakeViewModel = viewModel()
    val navController = rememberNavController()
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(vm) {
        vm.messages.collect { snackbarHostState.showSnackbar(it) }
    }

    val people by vm.people.collectAsState()
    val alerts by vm.alerts.collectAsState()
    val shelters by vm.shelters.collectAsState()
    val profile by vm.profile.collectAsState()
    val emergencyId by vm.emergencyId.collectAsState()
    val event by vm.event.collectAsState()
    val selfSafe by vm.selfSafe.collectAsState()
    val beaconGranted by vm.beaconGranted.collectAsState()
    val beaconActive by vm.beaconActive.collectAsState()
    val beaconStartedAt by vm.beaconStartedAt.collectAsState()
    val beaconMode by vm.beaconMode.collectAsState()
    val scanning by vm.scanning.collectAsState()
    val nearbyBeacons by vm.nearbyBeacons.collectAsState()

    val currentEntry by navController.currentBackStackEntryAsState()
    val currentRoute = currentEntry?.destination?.route
    val showNavigationBar = TOP_LEVEL.any { it.route == currentRoute }

    Surface(color = MaterialTheme.colorScheme.surface) {
        Box(Modifier.fillMaxSize()) {
            Column(Modifier.fillMaxSize()) {
                NavHost(
                    navController = navController,
                    startDestination = Routes.HOME,
                    modifier = Modifier.weight(1f),
                ) {
                    composable(Routes.HOME) {
                        HomeScreen(
                            event = event,
                            people = people,
                            profileCompleteness = profile.completeness(),
                            safe = selfSafe,
                            onToggleEvent = vm::toggleEvent,
                            onSafe = vm::markSelfSafe,
                            onBeacon = { navController.navigate(Routes.BEACON) },
                            onProfile = { navController.navigate(Routes.PROFILE) },
                            onTest = vm::testBeacon,
                            onMap = { navController.switchTab(Routes.SEARCH) },
                        )
                    }

                    composable(Routes.SEARCH) {
                        SearchScreen(
                            people = people,
                            shelters = shelters,
                            scanning = scanning,
                            nearbyBeacons = nearbyBeacons,
                            onStartScan = vm::startScanning,
                            onStopScan = vm::stopScanning,
                            onSilenceAlarm = vm::silenceAlarm,
                            onOpenPerson = { navController.navigate(Routes.person(it)) },
                            onReport = { navController.navigate(Routes.REPORT) },
                        )
                    }

                    composable(Routes.ALERTS) {
                        AlertsScreen(alerts = alerts, event = event)
                    }

                    composable(Routes.ME) {
                        MeScreen(
                            profile = profile,
                            safe = selfSafe,
                            beaconActive = beaconActive,
                            onSafe = vm::toggleSelfSafe,
                            onProfile = { navController.navigate(Routes.PROFILE) },
                            onBeacon = { navController.navigate(Routes.BEACON) },
                        )
                    }

                    composable(Routes.BEACON) {
                        BeaconScreen(
                            profile = profile,
                            emergencyId = emergencyId,
                            granted = beaconGranted,
                            active = beaconActive,
                            startedAt = beaconStartedAt,
                            mode = beaconMode,
                            onMode = vm::setBeaconMode,
                            onGrant = vm::grantBeacon,
                            onStart = vm::startBeacon,
                            onStop = vm::stopBeacon,
                            onBack = { navController.popBackStack() },
                        )
                    }

                    composable(Routes.PROFILE) {
                        ProfileScreen(
                            profile = profile,
                            onBack = { navController.popBackStack() },
                            onSave = {
                                vm.saveProfile(it)
                                navController.popBackStack()
                            },
                        )
                    }

                    composable(Routes.REPORT) {
                        ReportScreen(
                            onBack = { navController.popBackStack() },
                            onSubmit = { name, lastSeen, relation ->
                                vm.submitReport(name, lastSeen, relation)
                                navController.popBackStack()
                            },
                        )
                    }

                    composable(Routes.PERSON) { entry ->
                        val personId = entry.arguments?.getString("personId")
                        val person = people.firstOrNull { it.id == personId }
                        if (person == null) {
                            LaunchedEffect(personId) { navController.popBackStack() }
                        } else {
                            PersonScreen(
                                person = person,
                                onBack = { navController.popBackStack() },
                                onMarkSafe = {
                                    vm.markPersonSafe(person)
                                    navController.popBackStack()
                                },
                            )
                        }
                    }
                }

                if (showNavigationBar) {
                    NavigationBar {
                        TOP_LEVEL.forEach { item ->
                            NavigationBarItem(
                                selected = currentRoute == item.route,
                                onClick = { navController.switchTab(item.route) },
                                icon = {
                                    if (item.route == Routes.ALERTS && alerts.isNotEmpty()) {
                                        BadgedBox(badge = { Badge { Text("${alerts.size}") } }) {
                                            Icon(iconFor(item.icon), contentDescription = null)
                                        }
                                    } else {
                                        Icon(iconFor(item.icon), contentDescription = null)
                                    }
                                },
                                label = { Text(item.label) },
                            )
                        }
                    }
                }
            }

            SnackbarHost(
                hostState = snackbarHostState,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = if (showNavigationBar) 88.dp else 16.dp),
            )
        }
    }
}

private fun NavHostController.switchTab(route: String) {
    navigate(route) {
        popUpTo(graph.findStartDestination().id) { saveState = true }
        launchSingleTop = true
        restoreState = true
    }
}
